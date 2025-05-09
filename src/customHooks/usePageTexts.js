import PageRows from 'pages/GenericPage/PageRows/PageRows';
import { useContext } from 'react';
import TextContext from 'context/appText';
import Topper from 'pages/GenericPage/Topper/Topper';
function usePageTexts() {
	const { pageTexts } = useContext(TextContext);

	const topperTitle = pageTexts[0].topper.topperTitle;
	const topperContent = pageTexts[0].topper.topperContent;
	const topperWriter = pageTexts[0].topper.topperWriter;
	const topperReference = pageTexts[0].topper.topperReference;
	const writerLink = pageTexts[0].topper.writerLink ? true : false;

	const topper = (
		<Topper
			writerLink={writerLink}
			title={topperTitle}
			content={topperContent}
			writer={topperWriter}
			reference={topperReference}
		/>
	);
	const renderedContent = pageTexts[0].rows.map((row) => {
		const newsStyle = row.newsStyle ? true : false;
		const caption = row.caption ? row.caption : '';
		const rotateMe = row.rotate ? true : false;
		const reverse = row.reverse ? true : false;
		const wide = row.wide ? true : false;

		return (
			<PageRows
				large={row.large}
				key={row.rowno}
				newsStyle={newsStyle}
				caption={caption}
				rotateMe={rotateMe}
				image={row.image}
				title={row.title}
				reverse={reverse}
				wide={wide}
			>
				{row.content}
			</PageRows>
		);
	});

	return { content: renderedContent, topper: topper };
}

export default usePageTexts;
