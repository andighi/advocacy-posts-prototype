import './assets/styles/App.scss'
import PostCard from './components/PostCard'

function App() {

  return (
    <>
      <div className='posts-container cat-p-xl' >
        <PostCard />
        <PostCard />

      </div>
    </>
  )
}

export default App
