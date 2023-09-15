import { ProgressBar } from  'react-loader-spinner';

function Loader() {
    return (
        <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor = 'brown'
            barColor = 'bisque'
        />
    )
}

export default Loader;