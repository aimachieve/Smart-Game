import * as React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { makeStyles } from '@material-ui/core'

function WinLoseModal(props) {
  const { onClose, isWin, open } = props

  const handleClose = () => {
    onClose()
  }

  // Set TextField's Color
  const useStyles = makeStyles({
    root: {
      '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
        borderRadius: '48px',
        marginTop: '110px',
      },
    },
  })
  const classes = useStyles()

  return (
    <Dialog onClose={handleClose} open={open} className={classes.root}>
      <DialogTitle
        sx={{
          background: isWin ? 'rgb(45, 211, 191)' : 'rgb(243, 71, 102)',
          color: 'white',
          borderRadius: '48px',
          padding: '12px 29px',
          zIndex: '9999',
          textAlign: 'center',
          fontSize: '22px',
        }}
      >
        {' '}
        {isWin ? 'YOU WON' : 'YOU LOSE'}
      </DialogTitle>
    </Dialog>
  )
}

WinLoseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default WinLoseModal
