import './assets/styles/App.scss'
import PostCard from './components/posts/PostCard.jsx'
import { PostCardData } from './models/models.ts'
import { useEffect, useState } from 'react'

function App() {

  const [usersInfo, setUsersInfo] = useState<PostCardData[] | null>(null);

  useEffect(() => {
    setUsersInfo(() => [
      {
        userId: 23,
        name: 'Robert',
        avatar: 'https://tinyurl.com/bdcu9va5',
        posts: [
          {
            title: 'Title',
            text: 'Lore impsum ae aga sulae ipsum',
            postedAt: '1h ago',
            image: 'https://www.telegraph.co.uk/content/dam/Travel/2019/January/greek-seaside-parga.jpg',
            likedBy: ['Diana', 'Sun', 'Livia', 'Costa'],
            comments: [
              {
                id: 32132,
                name: 'Alisa',
                avatar: 'https://varbai.com/wp-content/uploads/2019/02/thispersondoesnotexis.jpg',
                text: 'Lore impsum ae aga sulae ipsum'
              },
            ],
            liked: true
          },

          {
            title: 'Title2',
            text: 'Lore impsum ipsum supum',
            postedAt: '4h ago',
            image: 'https://www.worldlifetimejourneys.com/wp-content/uploads/2019/05/Greece-Holiday-Offers-700px.jpg',
            likedBy: ['Ana', 'Pliskova', 'Dan', 'Erin'],
            comments: [
              {
                id: 231,
                name: 'Andrew',
                avatar: 'https://preview.redd.it/this-person-does-not-exist-v0-9l5x3d2g21591.jpg?auto=webp&s=97e2a0e5624f9e052678ddb38812fea2945f5b19',
                text: 'Lore impsum'
              },

              {
                id: 321,
                name: 'Andrew',
                avatar: 'https://preview.redd.it/this-person-does-not-exist-v0-9l5x3d2g21591.jpg?auto=webp&s=97e2a0e5624f9e052678ddb38812fea2945f5b19',
                text: 'Lore impsum'
              },
            ],
            liked: false
          }
        ]
      },
    ])
  }, [])


  return (
    <>
      <div className='posts-container cat-p-xl' >
        {usersInfo && usersInfo[0]?.posts.map(post => {
          return <PostCard name={usersInfo[0].name} avatar={usersInfo[0].avatar} post={post} key={post.title} />
        })}
      </div>
    </>
  )
}

export default App
