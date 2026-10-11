import { Box, FormControlLabel, IconButton, MenuItem, Switch, TextField, Tooltip, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import { fieldKind, humanize, isHiddenKey, selectOptions, blankLike, newId, itemTitle } from '../../../lib/fieldTypes'
import { listTemplates } from '../../../config/admin'
import Icon, { iconNames } from '../../Icon'
import MediaField from './MediaField'
import CollapsibleCard from './CollapsibleCard'

// Renders an editor for any JSON content value; field types are inferred from keys and values.
export default function ContentEditor({ value, onChange, ctx }) {
  if (Array.isArray(value)) return <ListField name={ctx?.rootKey ?? 'items'} value={value} onChange={onChange} ctx={ctx} />
  return <ObjectFields value={value ?? {}} onChange={onChange} ctx={ctx} />
}

function ObjectFields({ value, onChange, ctx }) {
  const set = (key, v) => onChange({ ...value, [key]: v })
  // Choosing a library image for `src` also fills a sibling `thumb` with its thumbnail.
  const pick = (key) => (media) => onChange({ ...value, [key]: media.url, ...(key === 'src' && 'thumb' in value && { thumb: media.thumbUrl ?? media.url }) })

  return (
    <Box sx={{ display: 'grid', gap: 2.25, gridTemplateColumns: 'minmax(0, 1fr)' }}>
      {Object.entries(value).filter(([k]) => !isHiddenKey(k)).sort(([a], [b]) => (b === 'visible') - (a === 'visible')).map(([k, v]) => (
        <Field key={k} name={k} value={v} onChange={(nv) => set(k, nv)} onPick={pick(k)} ctx={ctx} />
      ))}
    </Box>
  )
}

function Field({ name, value, onChange, onPick, ctx }) {
  const label = humanize(name)
  const kind = fieldKind(name, value, ctx)

  switch (kind) {
    case 'boolean':
      return <FormControlLabel control={<Switch checked={value} onChange={(e) => onChange(e.target.checked)} />} label={label} />
    case 'number':
      return <TextField label={label} type="number" size="small" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    case 'select': {
      const options = selectOptions(name, ctx)
      const all = value && !options.some((o) => o.value === value) ? [{ value, label: value }, ...options] : options
      return (
        <TextField select label={label} size="small" value={value ?? ''} onChange={(e) => onChange(e.target.value)} fullWidth>
          {all.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
        </TextField>
      )
    }
    case 'icon':
      return (
        <TextField select label={label} size="small" value={value ?? ''} onChange={(e) => onChange(e.target.value)} fullWidth
          slotProps={{ select: { renderValue: (v) => <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Icon name={v} fontSize="small" />{v}</Box> } }}>
          {iconNames.map((n) => <MenuItem key={n} value={n}><Icon name={n} fontSize="small" sx={{ mr: 1 }} />{n}</MenuItem>)}
        </TextField>
      )
    case 'image':
    case 'video':
      return <MediaField label={label} value={value} type={kind} onChange={onChange} onPick={onPick} />
    case 'textarea':
      return <TextField label={label} multiline minRows={2} maxRows={12} size="small" value={value ?? ''} onChange={(e) => onChange(e.target.value)} fullWidth />
    case 'stringList':
      return <StringListField label={label} value={value} onChange={onChange} />
    case 'list':
      return <ListField name={name} value={value} onChange={onChange} ctx={ctx} />
    case 'object':
      return (
        <Group label={label}>
          <ObjectFields value={value} onChange={onChange} ctx={ctx} />
        </Group>
      )
    default:
      return <TextField label={label} size="small" value={value ?? ''} onChange={(e) => onChange(e.target.value)} fullWidth />
  }
}

function Group({ label, children }) {
  return (
    <Box component="fieldset" sx={{ m: 0, border: '1px solid rgba(7,29,51,.12)', borderLeft: '3px solid #D6AD52', borderRadius: '4px', p: { xs: 1.5, sm: 2 }, pt: 1, minWidth: 0 }}>
      <Typography component="legend" sx={{ px: 0.75, fontWeight: 600, fontSize: '0.85rem', color: 'text.primary' }}>{label}</Typography>
      {children}
    </Box>
  )
}

const moveIn = (arr, i, d) => {
  const next = [...arr]
  ;[next[i], next[i + d]] = [next[i + d], next[i]]
  return next
}

function RowActions({ index, length, onMove, onRemove }) {
  return (
    <Box sx={{ display: 'flex', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
      <Tooltip title="Move up"><span><IconButton size="small" disabled={index === 0} onClick={() => onMove(-1)}><ArrowUpward fontSize="small" /></IconButton></span></Tooltip>
      <Tooltip title="Move down"><span><IconButton size="small" disabled={index === length - 1} onClick={() => onMove(1)}><ArrowDownward fontSize="small" /></IconButton></span></Tooltip>
      <Tooltip title="Remove"><IconButton size="small" color="error" onClick={onRemove}><DeleteOutlined fontSize="small" /></IconButton></Tooltip>
    </Box>
  )
}

function StringListField({ label, value, onChange }) {
  return (
    <Group label={label}>
      <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'minmax(0, 1fr)' }}>
        {value.map((v, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <TextField size="small" fullWidth multiline maxRows={6} value={v} onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))} />
            <RowActions index={i} length={value.length} onMove={(d) => onChange(moveIn(value, i, d))} onRemove={() => onChange(value.filter((_, j) => j !== i))} />
          </Box>
        ))}
        <Button size="small" startIcon={<AddIcon />} onClick={() => onChange([...value, ''])} sx={{ justifySelf: 'start' }}>Add</Button>
      </Box>
    </Group>
  )
}

function ListField({ name, value, onChange, ctx }) {
  const add = () => {
    const template = structuredClone(listTemplates[name] ?? blankLike(value[0] ?? { title: '' }))
    if ('id' in template) template.id = newId()
    onChange([...value, template])
  }
  return (
    <Group label={humanize(name)}>
      <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'minmax(0, 1fr)' }}>
        {value.map((item, i) => (
          <CollapsibleCard key={item?.id ?? i} title={itemTitle(item)} index={i}
            actions={<RowActions index={i} length={value.length} onMove={(d) => onChange(moveIn(value, i, d))} onRemove={() => onChange(value.filter((_, j) => j !== i))} />}>
            <ObjectFields value={item} onChange={(nv) => onChange(value.map((x, j) => (j === i ? nv : x)))} ctx={ctx} />
          </CollapsibleCard>
        ))}
        <Button size="small" startIcon={<AddIcon />} onClick={add} sx={{ justifySelf: 'start' }}>Add {humanize(name).replace(/s$/, '').toLowerCase()}</Button>
      </Box>
    </Group>
  )
}
