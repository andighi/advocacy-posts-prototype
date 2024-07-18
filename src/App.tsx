import './assets/styles/App.scss'
import PostCard from './components/posts/PostCard.jsx'
import { PostCardData } from './models/models.ts'
import { useEffect, useState } from 'react'
import initialUsersInformation from './initialData.json'
import { useDispatch, useSelector } from 'react-redux'
import { setInitialData } from './store/reducers/usersReducer.js'

function App() {

  const usersInfo = useSelector(state => state.users.users)
  const dispatch = useDispatch()


  const [initialUsersInfo] = useState<PostCardData[] | null>(
    initialUsersInformation.users
  );

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(initialUsersInfo))
    }
    dispatch(setInitialData());
  }, [])


  return (
    <>
      <div className='posts-container cat-p-xl' >
        {usersInfo && usersInfo[0]?.posts.map(post => {
          return <PostCard id={usersInfo[0].userId} name={usersInfo[0].name} avatar={usersInfo[0].avatar} post={post} key={post.title} />
        })}
      </div>
    </>
  )
}

export default App
