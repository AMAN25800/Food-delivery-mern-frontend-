import react, { useEffect } from 'react';
import './Slider.css';
const Slider=({loggedin})=>{
  setTimeout(()=>{
    document.getElementById('next').click();

  },23000);
  
  useEffect(() => {
    // Dynamically load the YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Function triggered when YouTube IFrame API is ready
    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player('player', {
        height: '514',
        width: '914',
        videoId: 'kRCH8kD1GD0', // Video ID
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          loop: 1,
          playlist: 'kRCH8kD1GD0',
          mute: 1, // Mute to ensure autoplay in most browsers
        },
        events: {
          onReady: (event) => {
            event.target.seekTo(4); // Skip the first 2 seconds and start at 2 seconds
            event.target.playVideo(); // Start playing
            event.target.setPlaybackQuality('hd1080'); // Set the video quality to HD 1080p
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              const duration = event.target.getDuration();
              const checkTime = setInterval(() => {
                const currentTime = event.target.getCurrentTime();
                if (currentTime >= duration - 7) { // Skip the last 7 seconds
                  event.target.seekTo(4); // Restart at 2 seconds
                }
              }, 1000);

              // Clean up the interval if the video stops
              return () => clearInterval(checkTime);
            }
          },
        },
      });
    };
  }, []);
  

return(
    
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" >
<div class="carousel-inner" id="slider">
<div class="carousel-item active" >

<div id='player'></div>

<div className='overlay'></div>
    

</div>
<div class='carousel-item'>
  <img src='https://media.istockphoto.com/id/516329534/photo/last-straw.jpg?s=612x612&w=0&k=20&c=q9tScD01SPtN5QNAYgWG-ot4n_4hZXOgMStuFgmBFa8=' class='d-block w-100 h-100 '/>
  </div>
  <div class='carousel-item'>
  <img src='https://media.istockphoto.com/id/1169694902/photo/assorted-indian-non-vegetarian-food-recipe-served-in-a-group-includes-chicken-curry-mutton.jpg?s=612x612&w=0&k=20&c=J4jX3IYGdS3ODgHF0LHCySDo6bFObh0_GZzAqHgXZgU=' class='d-block w-100 h-100 '/>
  </div>


</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" id="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" id="next" >
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden" >Next</span>
</button>
</div>

)
}
export default Slider;

/*

<img src="https://media.istockphoto.com/id/1372697005/photo/food-variety-on-table-with-empty-plate.webp?a=1&b=1&s=612x612&w=0&k=20&c=KYYag8zNbEvpLFiAcFJBVGI1AN2ehrUazrOkAbjm3Hs= " class="d-block w-100" alt="..."  />
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://plus.unsplash.com/premium_photo-1695799627590-42bc3d5a9e90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZvb2QlMjBpbiUyMGRpbm5pbmclMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://media.istockphoto.com/id/537467632/photo/delisious-traditional-english-dessert-eton-mess.jpg?s=612x612&w=0&k=20&c=WV_fc0zSpCnuAC6yPp37pd5nYlsya1L9RMHQzOOpzyE=" class="d-block w-100" alt="..."/>
*/