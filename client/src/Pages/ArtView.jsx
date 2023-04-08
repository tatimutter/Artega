import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';

function ArtView() {
	// Get the objectNumber from the URL parameter using useParams() hook
	let params = useParams();
	console.log('Object number:', params.objectNumber);

	// Set up state variables for the artwork and whether it is currently being read out loud
	const [artwork, setArtwork] = useState({});
	const [isReading, setIsReading] = useState(false);

	// API key for the Rijksmuseum API
	const API_Key = 'IagrCxtB';

	// Define a function to fetch the artwork data from the API
	const fetchArtwork = useCallback(async () => {
		try {
			const resp = await fetch(
				`https://www.rijksmuseum.nl/api/en/collection/${params.objectNumber}?key=${API_Key}`
			);
			const data = await resp.json();
			console.log(data);
			console.log('fetchArtwork called');
			return data;
		} catch (error) {
			console.error(error);
		}
	}, [API_Key, params.objectNumber]);

	// Use the useEffect() hook to fetch the artwork data when the component mounts
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

	// Define a function to toggle whether the description is being read out loud
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
							padding: '10px',
						}}>
						<h6 style={{ fontSize: '30px' }}>
							{artwork.artObject.label.description}
						</h6>
						<button
							style={{
								backgroundColor: '#F7C815',
								color: 'white',
								fontSize: '20px',
								padding: '10px 20px',
								border: 'none',
								borderRadius: '5px',
								background: isReading ? 'red' : '#F7C815',
							}}
							onClick={toggleReading}>
							{isReading ? 'Stop Reading' : 'Read Description'}
						</button>
					</div>

					<Link to="/Gallery" style={{ display: 'block', margin: '40px 0' }}>
						<button
							style={{
								backgroundColor: '#EC9704',
								color: 'white',
								fontSize: '20px',
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
