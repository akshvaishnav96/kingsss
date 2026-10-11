import { useParams } from 'react-router'
import { Box, Button, Card, CircularProgress, IconButton, Switch, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditOutlined from '@mui/icons-material/EditOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import { collections } from '../../config/admin'
import { useItemEditor } from '../../hooks/admin/useItemEditor'
import { useSettings } from '../../hooks/admin/useSettings'
import { useConfirm } from '../../hooks/admin/useConfirm'
import { itemTitle } from '../../lib/fieldTypes'
import PageHeader from '../../components/admin/PageHeader'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import ItemEditorDialog from '../../components/admin/ItemEditorDialog'
import AdminNotFound from './AdminNotFound'
import { brand } from '../../theme/theme'

export default function CollectionPage() {
  const { collection } = useParams()
  const meta = collections[collection]
  return meta ? <CollectionView key={collection} collection={collection} meta={meta} /> : <AdminNotFound />
}

function CollectionView({ collection, meta }) {
  const editor = useItemEditor(collection)
  const { data: settings } = useSettings()
  const { confirm, dialogProps } = useConfirm()
  const { items, isLoading, move, togglePublished, remove } = editor

  const onDelete = async (item) => {
    if (await confirm({ title: `Delete ${meta.singular}?`, message: `“${itemTitle(item.data, meta.titleKey)}” will be removed from the website.` })) remove(item.id)
  }

  return (
    <>
      <PageHeader title={meta.label} subtitle={`${items.length} ${items.length === 1 ? meta.singular : `${meta.singular}s`} · drag order with the arrows; unpublished items are hidden from the website.`}
        actions={<Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={editor.openNew}>Add {meta.singular}</Button>} />

      {isLoading ? <CircularProgress /> : (
        <Card variant="outlined">
          {items.length === 0 && <Typography sx={{ p: 3, color: 'text.secondary' }}>Nothing here yet.</Typography>}
          {items.map((item, i) => {
            const thumb = item.data[meta.imageKey] || item.data.src
            return (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.25, borderTop: i ? '1px solid rgba(7,29,51,.08)' : 0, opacity: item.published ? 1 : 0.55 }}>
                <Box sx={{ width: 56, height: 56, flexShrink: 0, borderRadius: '4px', overflow: 'hidden', bgcolor: brand.soft }}>
                  {thumb && <img src={thumb} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600 }} noWrap>{itemTitle(item.data, meta.titleKey)}</Typography>
                  {meta.subtitleKey && <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>{item.data[meta.subtitleKey]}</Typography>}
                </Box>
                <Tooltip title={item.published ? 'Published' : 'Hidden'}><Switch checked={item.published} onChange={() => togglePublished(item)} slotProps={{ input: { 'aria-label': 'Published' } }} /></Tooltip>
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <IconButton size="small" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUpward fontSize="small" /></IconButton>
                  <IconButton size="small" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDownward fontSize="small" /></IconButton>
                </Box>
                <IconButton onClick={() => editor.openEdit(item)} aria-label="Edit"><EditOutlined /></IconButton>
                <IconButton color="error" onClick={() => onDelete(item)} aria-label="Delete"><DeleteOutlined /></IconButton>
              </Box>
            )
          })}
        </Card>
      )}

      <ItemEditorDialog editor={editor} meta={meta} ctx={{ collection, settings }} />
      <ConfirmDialog {...dialogProps} />
    </>
  )
}
