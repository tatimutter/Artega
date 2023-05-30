import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import TtsButton from '../Components/TtsButton';

function ArtView() {
	// Get the objectNumber from the URL parameter using useParams() hook
	let params = useParams();
	console.log('Object number:', params.objectNumber);

	// Set up state variables for the artwork and whether it is currently being read out loud
	const [artwork, setArtwork] = useState({});
	const [isReading, setIsReading] = useState(false);

	const [isFavorite, setIsFavorite] = useState(false);

	// API key for the Rijksmuseum API
	const apiKey = process.env.REACT_APP_API_KEY;

	// Fetching the artwork data from the API
	const fetchArtwork = useCallback(async () => {
		try {
			const resp = await fetch(
				`https://www.rijksmuseum.nl/api/en/collection/${params.objectNumber}?key=${apiKey}`
			);
			const data = await resp.json();
			console.log(data);
			console.log('fetchArtwork called');
			return data;
		} catch (error) {
			console.error(error);
		}
	}, [apiKey, params.objectNumber]);

	// Function to toggle whether the description is being read out loud
	const toggleReading = () => {
		if (!isReading) {
			// Create a new SpeechSynthesisUtterance object and speak the description
			const speech = new SpeechSynthesisUtterance(
				artwork.artObject.label.description
			);
			speech.lang = 'en-US';
			setIsReading(true);
			speech.onend = () => setIsReading(false);
			window.speechSynthesis.speak(speech);
		} else {
			// Stop speaking if the description is already being read out loud
			window.speechSynthesis.cancel();
			setIsReading(false);
		}
	};

	// useEffect() hook to fetch the artwork data when the component mounts
	useEffect(() => {
		let isMounted = true;
		fetchArtwork().then((data) => {
			// Set the artwork state variable only if the component is still mounted
			if (isMounted) setArtwork(data);
		});
		return () => {
			// Clean up function to set isMounted to false when the component unmounts
			isMounted = false;
		};
	}, [fetchArtwork]);

	//Add (and delete) favorites - useCallBack to prevent re-rendering
	const handleAddFavorite = useCallback(() => {
		const addFavorite = async (artworkData) => {
			try {
				let options = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(artworkData),
				};

				let results = await fetch('/favorites', options);
				let data = await results.json();
				console.log(data);
				setIsFavorite(true);
				console.log(results);
			} catch (err) {
				console.log(err);
			}
		};

		addFavorite({
			objectNumber: artwork.artObject.objectNumber,
			title: artwork.artObject.longTitle,
			imageURL: artwork.artObject.webImage.url,
		});
		//setIsFavorite(true);
	}, [artwork, setIsFavorite]);

	/* async function deleteFavorite() {
		try {
			let options = {
				method: 'DELETE',
			};
			let results = await fetch(
				`/favorites/${artwork.artObject.objectNumber}`,
				options
			);
			let data = await results.json();
			console.log(data);
			setIsFavorite(false);
		} catch (err) {
			console.log(err);
		}
	} */

	return (
		// Render the artwork data if it has been fetched
		<div className="ArtView" style={{ maxWidth: '80%', margin: 'auto' }}>
			{artwork.artObject && (
				<>
					{/* Render the artwork image */}
					<img
						src={artwork.artObject.webImage.url}
						alt={artwork.artObject.title}
						style={{ maxWidth: '50%', height: 'auto' }}
					/>
					{/* Render the artwork title */}
					<h2 style={{ margin: '20px 0' }}> {artwork.artObject.longTitle}</h2>

					{/* Render the artwork scLabelLine */}
					<h4
						style={{
							border: '1px solid black',
							padding: '10px',
							marginBottom: '20px',
						}}>
						{artwork.artObject.scLabelLine}
					</h4>

					{/* Render the artwork description and a button to toggle reading it out loud */}
					<div
						style={{
							border: '1px solid black',
							padding: '20px',
							marginBottom: '15px',
						}}>
						<h6 style={{ fontSize: '30px' }}>
							{artwork.artObject.label.description}
						</h6>
						<br />
						<button
							style={{
								backgroundColor: '#F7C815',
								color: 'black',
								fontSize: '25px',
								padding: '10px 20px',
								border: 'none',
								borderRadius: '5px',
								background: isReading ? 'red' : '#F7C815',
							}}
							onClick={toggleReading}>
							{isReading ? 'Stop Audio' : 'Click to hear this text'}{' '}
							<FiVolume2 className="TSS-icon" />
						</button>
					</div>
					{/* Button to add artwork to favorites */}
					<button
						onClick={handleAddFavorite}
						style={{
							backgroundColor: '#F48804',
							color: 'black',
							fontSize: '25px',
							padding: '10px 20px',
							border: 'none',
							borderRadius: '5px',
						}}>
						{/* Button's text changes depending on whether the artwork was added or not to favorites */}
						{isFavorite
							? 'Added to Community Favorites'
							: 'Add to Community Favorites'}
					</button>

					<Link to="/Gallery" style={{ display: 'block', margin: '40px 0' }}>
						<button
							style={{
								backgroundColor: '#DB4627',
								color: 'black',
								fontSize: '25px',
								padding: '10px 20px',
								border: 'none',
								borderRadius: '5px',
							}}>
							<i
								className="fa fa-chevron-left"
								style={{ marginRight: '10px' }}></i>
							Go Back to the Gallery
						</button>
					</Link>
				</>
			)}
		</div>
	);
}

export default ArtView;
