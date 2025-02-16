const products = [
    {
      title: "Latest SmartPhones",
      description: "Innovation at your fingerPrints.",
      data: [
        {
          imageUrl: "https://img.freepik.com/free-photo/close-up-friends-hands-play-with-smartphone-together_1150-4521.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Flagship Model"
        },
        {
          imageUrl: "https://img.freepik.com/free-photo/many-different-smart-phones-displayed-dark-background-busy-office-scene_1372-28.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Budget Phone"
        },
        {
          imageUrl: "https://img.freepik.com/free-vector/mobile-chat-illustration_98292-4174.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Gaming Phone"
        },
        {
          imageUrl: "https://img.freepik.com/free-photo/modern-desktop-with-phone-tablet-glasses-blue-light-pink-background_24972-100.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Camera Phone"
        }
      ]
    },
    {
      title: "Latest Laptops",
      description: "Power and performance combined.",
      data: [
        {
          imageUrl: "https://img.freepik.com/free-photo/laptops-office-with-business-teamwork-discuss_1421-586.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Ultrabook"
        },
        {
          imageUrl: "https://img.freepik.com/free-photo/office-desktop-with-laptops_23-2148179149.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Gaming Laptop"
        },
        {
          imageUrl: "https://img.freepik.com/free-vector/video-conference-remote-working-flat-illustration-screen-laptop-with-group-colleagues-people-conn_88138-548.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Business Laptop"
        },
        {
          imageUrl: "https://img.freepik.com/free-photo/laptop-with-white-screen-isolated-white-wall_231208-8594.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "2-in-1 Convertible"
        }
      ]
    },
    {
      title: "Latest Smart Watches",
      description: "Stay connected on the go.",
      data: [
        {
          imageUrl: "https://img.freepik.com/free-vector/smartwatch-concept-illustration_114360-4306.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Fitness Tracker"
        },
        {
          imageUrl: "https://img.freepik.com/free-photo/woman-using-smartwatch-with-e-mail-notifier_7861-861.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Luxury Smartwatch"
        },
        {
          imageUrl: "https://img.freepik.com/free-photo/high-angle-man-wearing-watch_23-2149436737.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Hybrid Smartwatch"
        },
        {
          imageUrl: "https://img.freepik.com/free-photo/portrait-fashionable-sportswoman-looking-modern-watch-hands-road-sunny-morning-training-attractive-woman-workout-healthy-lifestyle-hardworking_197531-2968.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Kids Smartwatch"
        }
      ]
    },
    {
      title: "Vapes",
      description: "Smooth experience, rich flavors.",
      data: [
        {
          imageUrl: "https://img.freepik.com/free-photo/face-vaping-young-man_155003-1836.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Disposable Vape"
        },
        {
          imageUrl: "https://img.freepik.com/free-photo/modern-girl-smoking-vape_8353-5972.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Rechargeable Vape"
        },
        {
          imageUrl: "https://img.freepik.com/free-vector/vape-shop-neon-sign-hand-holding-electronic-cigarette-brick-wall_1262-11929.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Pod System"
        },
        {
          imageUrl: "https://img.freepik.com/free-photo/woman-vaping-from-hookah-indoors_23-2149173616.jpg?ga=GA1.1.833923548.1739712221&semt=ais_hybrid",
          subTitle: "Mod Vape"
        }
      ]
    }
  ];
import React from 'react'
import SingleFeaturedItem from './SingleFeaturedItem'
const FeaturedItems = () => {
  return (
    <div className='container  my-4'>
        <h2 className="subHeading">Quick Selections</h2>
        <div className="allSelections flex flex-wrap justify-between">
          {products.map((product,index)=>{
            return <div key={index} className='flex flex-wrap'>
                <SingleFeaturedItem {...product}/>
                </div>
          })}
        </div>
    </div>
  )
}
export default FeaturedItems