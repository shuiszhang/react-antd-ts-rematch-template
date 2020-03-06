import React from 'react'
import { connect } from 'react-redux'
import { IRootState, Dispatch } from '@/store'

const Profile = ({ getProfile }) => {
  React.useEffect(() => {
    getProfile()
  }, [])

  return <div>profile</div>
}

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.user,
    loading: state.loading.effects.user.getProfile
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProfile: dispatch.user.getProfile
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
