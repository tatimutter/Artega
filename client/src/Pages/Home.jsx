import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide'; // Importing Splide slider component
import '@splidejs/splide/dist/css/themes/splide-default.min.css'; // Importing default styling for Splide slider
import './Home.css';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import TtsButton from '../Components/TtsButton';

function Home() {
	const [isSpeaking, setIsSpeaking] = useState(false); // Setting state for whether intro is being spoken or not
	const introText =
		"Artega is brought by you by the ReTaGa Project. We understand that getting out and about can be a challenge for some, and we believe that everyone deserves the chance to experience the beauty and wonder of art. That's why we have created a virtual space where you can explore the galleries of some museums from the comfort of your own home. Our website is designed with accessibility in mind, to ensure that all people can easily navigate and enjoy the art on display. So come on in, take a virtual stroll through our museums' galleries, and discover a whole new world of art that you may never have had the chance to experience before.";

	// Array of image URLs for the slider
	const images = [
		'https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg?auto=compress&cs=tinysrgb&w=600',
		'https://images.pexels.com/photos/1414467/pexels-photo-1414467.jpeg?auto=compress&cs=tinysrgb&w=600',
		'https://images.pexels.com/photos/4449429/pexels-photo-4449429.jpeg?auto=compress&cs=tinysrgb&w=600',
		'https://images.pexels.com/photos/6039194/pexels-photo-6039194.jpeg?auto=compress&cs=tinysrgb&w=600',
		'https://images.pexels.com/photos/9022677/pexels-photo-9022677.jpeg?auto=compress&cs=tinysrgb&w=600',
		'https://images.pexels.com/photos/4456986/pexels-photo-4456986.jpeg?auto=compress&cs=tinysrgb&w=600',
		'https://www.european-umbrellas.com/pub/media/amasty/blog/cache/R/i/950/535/Rijksmuseum-Amsterdam-796.jpg',
		'https://images.pexels.com/photos/6318598/pexels-photo-6318598.jpeg?auto=compress&cs=tinysrgb&w=600',
	];

	const options = {
		// Options for the Splide slider
		perPage: 1, // Number of slides to display per page
		rewind: true, // Whether the slider should loop back to the beginning or stop at the last slide
		gap: 10, // Space between slides
		pagination: false, // Whether to show pagination bullets at the bottom of the slider
		arrows: true, // Whether to show arrow buttons to navigate between slides
	};

	return (
		<div>
			<div className="home-container container py-5">
				<h1>Welcome to Artega!</h1>
				<div className="intro">
					<p>{introText}</p>

					<TtsButton text={introText} />
					{/* <button
						style={{
							backgroundColor: '#F7C815',
							color: 'black',
							fontSize: '25px',
							padding: '10px 20px',
							border: 'none',
							borderRadius: '5px',
							marginBottom: '20px',
						}}
						onClick={speakIntro}
						disabled={isSpeaking}>
						{/* Button's text changes depending on whether the artwork was added or not to favorites */}
					{/*{isSpeaking ? 'Speaking...' : 'Click to hear this text'}
						<FiVolume2 className="TSS-icon" />
					</button> */}

					{isSpeaking && (
						<button
							style={{
								backgroundColor: '#FF0000',
								color: 'black',
								fontSize: '25px',
								padding: '10px 20px',
								border: 'none',
								borderRadius: '5px',
							}}
							//onClick={stopReading}
						>
							Stop Audio <FiVolumeX className="TSS-icon" />
						</button>
					)}
				</div>
				<Link to="/Gallery">
					<button className="museum-btn">Explore Rijksmuseum</button>
				</Link>
				<img
					className="museum-img"
					src="https://cms-assets.jung.de/cms/media/39/3967/980x496/standard/rijksmuseum-amsterdam-16.jpg"
					alt="Façade of the Rijksmuseum in Amsterdam"
				/>
				<br />
				<Link to="/WcmaGallery">
					<button className="museum-btn">
						Explore Williams College Museum of Art
					</button>
				</Link>
				<img
					className="museum-img"
					src="https://images.squarespace-cdn.com/content/v1/56129554e4b0ece82a73e175/1447361138550-IHLBEQALH74MC781K7GZ/image-asset.jpeg"
					alt="Garden and façade of the Williams College Museum of Art in Williamstown, Massachusetts"
				/>
				{/* using React Splide to create an image gallery */}
				{/* <Splide options={options} className="splide-container">
					{images.map((image, index) => (
						<SplideSlide key={index} style={{ margin: '0 10px' }}>
							<img
								src={image}
								alt={`Rijksmuseum ${index}`}
								className="slide-image"
								style={{
									display: 'block',
									margin: '10px auto !important',
									height: '50%',
									width: 'auto',
								}}
							/>
						</SplideSlide>
					))}
				</Splide> */}
			</div>
		</div>
	);
}

export default Home;
