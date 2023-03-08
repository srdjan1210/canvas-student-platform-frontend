interface Props {
    percentage: number
}

export const ProgressBar = ({ percentage }: Props) => {
    return (
        <div className="download">
            <svg viewBox="0 0 300 300">
                <circle
                    strokeLinecap="round"
                    className="circle"
                    cx="150"
                    cy="150"
                    r="136"
                />
                <circle className="circle2" cx="150" cy="150" r="141" />
            </svg>
            <i className="icon-cloud"></i>
        </div>
    )
}
