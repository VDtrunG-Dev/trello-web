import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{
          p: 1.5, '&:last-child': { p: 1.5 }
        }}>
          <Typography>DucTrungDev MERN Stack</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqrIiSPEMlSQ0oRB2LpuMsR37F_oOV8zgcPw&s'
        title="green iguana"
      />
      <CardContent sx={{
        p: 1.5, '&:last-child': { p: 1.5 }
      }}>
        <Typography>DucTrungDev MERN Stack</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px' }}>
        <Button size="small" startIcon={<GroupIcon />}> 24</Button>
        <Button size="small" startIcon={<CommentIcon />}> 5</Button>
        <Button size="small" startIcon={<AttachmentIcon />}> 23</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
