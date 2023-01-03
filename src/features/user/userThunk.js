import customFetch from '../../utils/axios'

import { logoutUser } from './userSlice'

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/auth/register', user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/auth/login', user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch('/auth/updateUser', user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        // authorization: `Bearer }`,
      },
    })
    return resp.data
  } catch (error) {
    console.log(error.response)
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
