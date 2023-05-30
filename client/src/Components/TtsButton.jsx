import React, { useState } from 'react';
import { FiVolume2 } from 'react-icons/fi';

function TtsButton({ text }) {
	// Function to toggle whether the description is being read out loud
	const [isReading, setIsReading] = useState(false);

	const toggleReading = () => {
		if (!isReading) {
			// Create a new SpeechSynthesisUtterance object and speak the description - 1st collection
			const speech = new SpeechSynthesisUtterance(text);
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
	);
}
export default TtsButton;
