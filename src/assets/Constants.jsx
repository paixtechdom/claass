import img1 from './img/1 (1).jpeg'
import img3 from './img/1 (2).jpg'
import img4 from './img/1 (7).jpeg'
import img7 from './img/1 (4).jpeg'
import img8 from './img/1 (4).jpg'
import img2 from './img/1 (5).jpeg'


const Links = [
    {
        name: 'Home',
        link: ''
    },
    {
        name: 'Sermons',
        link: 'sermons'
    },
    {
        name: 'Articles',
        link: 'articles'
    },
    {
        name: 'Gallery',
        link: 'gallery'
    }
]

const carouselItems = [
    // Add your carousel items here
    {   
        caption: 'Welcome to',
        class: 'hero1',
        p: 'Christ Liberty Assembly',
    },
    { 
        class: 'hero3',
        caption: 'Unending Joy',
        p: 'Isaiah 35:10',
    },
    { 
        class: 'hero2',
        caption: 'Revealing Christ',
        p: '',
    },
    { 
        class: 'hero4',
        caption: '...Jesus...',
        p: ' nothing else',
    },
  ]


  const Statements = {
    mission: {
        title: 'Mission',
        texts: [
            'Winning souls for Christ', 
            'Living in love as a church in Commonwealth of saints',
            'Being a people of Faith, standing in the Liberty with which Christ hath made us free; and thus becoming a voice of hope for the world.'
        ],
        img: img7
    },
    
    vision: {
        title: 'Vision',
        texts: [
            'Revealing Christ through the manifestation of the priesthood of every believer'
        ],
        img: img2
    }

  }

  export { Links, carouselItems, Statements }