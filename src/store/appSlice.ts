import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
//import type { RootState } from './store'
import axios from 'axios'

interface Owner {
    avatar_url: string;
    login: string;
    type: string;
    html_url: string;
}

export interface Items {
    id: number;
    name: string;
    stargazers_count: number;
    pushed_at: string;
    git_url: string;
    description: string;
    language: string
    owner: Owner;
}

interface AppState {
    totalCount: number;
    currPage: number;
    items: Items[] | [];
    isLoading: boolean;
    isError: boolean;
    errorMsg: string;
    searchValue: string;
}

const initialState: AppState = {
    searchValue: '',
    currPage: 1,
    totalCount: 0,
    items: [],
    isLoading: false,
    isError: false,
    errorMsg: '',
}

interface RequestParams {
    query: string;
    curPage: number;
}

const baseUrl = 'https://api.github.com/search/repositories?per_page=10&order=desc'

export const getRepositories = createAsyncThunk(
    'app/getRepositories',
    async (params: RequestParams, thunkAPI) => {
        try {
            const { query, curPage } = params
            const response = await axios.get(`${baseUrl}&q=${query}&page=${curPage}`)
            return (response.data)
        }
        catch (error) {
            if (error.response) {
                return thunkAPI.dispatch(catchRequestError(error.response.data.message))
            }
        }
   }
)

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      catchRequestError: (state, action) => {
         state.errorMsg = action.payload
         state.isError = true
         //state.items = []
      },
      getSearchValue: (state, action) => {
        state.searchValue = action.payload
      },
      getCurrantPage: (state, action) => {
        state.currPage = action.payload
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getRepositories.pending, (state, action) => {
          state.isLoading = true
          state.isError = false
          //state.items = []
        //   console.log(state)
        //   console.log(action)
          // both `state` and `action` are now correctly typed
          // based on the slice state and the `pending` action creator
        })
        builder.addCase(getRepositories.fulfilled, (state, action) => {
            state.items = action.payload.items
            state.totalCount = action.payload.total_count
            state.isLoading = false
            state.isError = false
            // console.log(state)
            // console.log(action)
        })
        builder.addCase(getRepositories.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            // console.log(state)
            // console.log(action)
        })
    },
})
  
  export const { 
    catchRequestError, 
    getSearchValue, 
    getCurrantPage, 
  } = appSlice.actions

  // Other code such as selectors can use the imported `RootState` type
  //export const selectCount = (state: RootState) => state.counter.value
  
  export default appSlice.reducer