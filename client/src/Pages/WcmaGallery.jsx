import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import { ImEyePlus } from 'react-icons/im';
import TtsButton from '../Components/TtsButton';

function Gallery() {
	const [collection, setCollection] = useState();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false); // Setting state for whether intro is being spoken or not
	const introText = 'The WCMA is...';
	/* const speakIntro = () => {
		// Function to speak the intro text using the SpeechSynthesis API
		const synth = window.speechSynthesis;
		const introUtterance = new SpeechSynthesisUtterance(introText);
		introUtterance.onend = () => {
			setIsSpeaking(false); // Set isSpeaking state to false when intro stops being read out loud
		};
		setIsSpeaking(true); // Set isSpeaking state to true while intro is read out loud
		synth.speak(introUtterance);
	};

	const stopReading = () => {
		const synth = window.speechSynthesis;
		synth.cancel();
		setIsSpeaking(false);
	}; */

	//Hook to populate the collection when the page loads
	/* useEffect(() => {
		getCollection();
	}, []); */

	//Loading only the first 8 images of the collection
	const [imgs, setImgs] = useState(8);

	//Loading 8 images more when the button is clicked
	const handleLoadMore = () => {
		setImgs(imgs + 8);
	};

	//Fetching collection AP
	/* const getCollection = async () => {
		try {
			setLoading(true);
			let response = await fetch(apiUrl);
			if (response.ok) {
				setLoading(false);
				let data = await response.json();
				let imagesArray = data.artObjects;
				setCollection(imagesArray);
				//console.log(data.artObjects);
			} else {
				setError(`Error: ${response.status} ${response.statusText}`);
			}
		} catch (error) {
			console.log(error.message);
		}
	}; */

	return (
		<>
			<div className="gallery container py-5">
				<h1>Welcome to the Williams College Museum of Art!</h1>

				<div className="intro">
					<p>{introText}</p>
					<TtsButton text={introText} />
				</div>
				<div className="collection-div">
					{collection && (
						<>
							<ResponsiveMasonry
								columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
								<Masonry gutter="{{100 rem}}">
									{collection.slice(0, imgs).map((obj, index) => (
										/*Link to ArtView page, show the image bigger and with info details*/
										<Link
											className="galleryImg card"
											to={`/ArtView/${obj.objectNumber}`}
											key={obj.objectNumber}>
											<img
												className="coll-img "
												key="index"
												alt="description"
												src={obj.webImage.url}
											/>
										</Link>
									))}
								</Masonry>
							</ResponsiveMasonry>
							<br />
							<div className="LMButton-div">
								{/* Button to load more images is visible until whole collections is loaded */}
								{imgs < collection.length && (
									<button
										type="button"
										onClick={handleLoadMore}
										className="btn">
										<ImEyePlus className="nav-icon" />

										<br />
										<span
											className="nav-text"
											style={{
												fontSize: '25px',
											}}>
											Click to see more art
										</span>
									</button>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default Gallery;
