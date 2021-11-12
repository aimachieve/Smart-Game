import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import WinnersAndPayout from './WinnersAndPayout.js'
import Games from './Games.js'
import Description from './Description.js'

const Landing = ({ isAuthenticated }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  console.log('isAuthenticated:', isAuthenticated)

  return (
    <section className="landing">
      <div className="landing-inner">
        <Grid container spacing={2} mt={32}>
          <Grid item xs={12} md={6}>
            {/* Winners and Total Payout */}
            <WinnersAndPayout />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Description */}
            <Description />
          </Grid>
        </Grid>
        {/* Games */}
        <Games />
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
