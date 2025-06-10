import { useEffect, useState } from 'react';
import WrapText from 'pages/GenericPage/PageRows/WrapText/WrapText';
import './pageRows.css';

import RegularRow from './RegularRow/RegularRow';
function PageRows({
	newsStyle,
	caption,
	rotateMe,
	image,
	title,
	reverse,
	wide,
	children,
	large,
}) {
	const [decisiveNewsStyle, setDecisiveNewsStyle] = useState(null);
	const [forcedNonReversed, setForcedNonReversed] = useState(null);
	const handleResize = () => {
		if (window.innerWidth < 1000) {
			setDecisiveNewsStyle(false);
			setForcedNonReversed(true);
		} else if (newsStyle && !wide) {
			setDecisiveNewsStyle(true);
			setForcedNonReversed(reverse);
		} else {
			if (wide) {
				setDecisiveNewsStyle(false);
				setForcedNonReversed(reverse);
			}
		}
	};

	useEffect(() => {
		if (window.innerWidth < 1000) {
			setDecisiveNewsStyle(false);
			setForcedNonReversed(true);
		} else if (newsStyle && !wide) {
			setDecisiveNewsStyle(true);
			setForcedNonReversed(reverse);
		} else {
			if (wide) {
				setDecisiveNewsStyle(false);
				setForcedNonReversed(reverse);
			}
		}

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [decisiveNewsStyle]);

	const newsContent = (
		<WrapText
			title={title}
			wide={wide}
			reverse={forcedNonReversed}
			large={large}
			rotateMe={rotateMe}
			caption={caption}
			displayedImage={image}
		>
			{children}
		</WrapText>
	);

	const regularContent = (
		<RegularRow
			large={large}
			reverse={forcedNonReversed}
			wide={wide}
			rotateMe={rotateMe}
			image={image}
			caption={caption}
			title={title}
			children={children}
		/>
	);
	const renderedContent = decisiveNewsStyle ? newsContent : regularContent;

	return renderedContent;
}

export default PageRows;
