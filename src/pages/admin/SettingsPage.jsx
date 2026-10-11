import { useParams } from 'react-router'
import { Box, CircularProgress } from '@mui/material'
import { pageGroups, settingDefaults } from '../../config/admin'
import { useSettings } from '../../hooks/admin/useSettings'
import PageHeader from '../../components/admin/PageHeader'
import SettingBlock from '../../components/admin/SettingBlock'
import AdminNotFound from './AdminNotFound'

export default function SettingsPage() {
  const { group: groupId } = useParams()
  const group = pageGroups.find((g) => g.id === groupId)
  const { data: settings, isPending } = useSettings()
  if (!group) return <AdminNotFound />

  return (
    <>
      <PageHeader title={group.label} subtitle="Edit text, images and lists. Each block is saved separately and goes live immediately." />
      {isPending ? <CircularProgress /> : (
        <Box sx={{ display: 'grid', gap: 3 }}>
          {group.keys.map((key) => (
            <SettingBlock key={key} settingKey={key} value={settingDefaults[key] ? { ...settingDefaults[key], ...settings[key] } : settings[key] ?? (key === 'stats' || key === 'socialLinks' ? [] : {})} ctx={{ settings }} />
          ))}
        </Box>
      )}
    </>
  )
}
