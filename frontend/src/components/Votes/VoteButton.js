import "./VoteButton.css"

const VoteButton = (countProp) => {
    // debugger
    let count = countProp.count
    let hasVoted = false

    const handleVote = (e) => {
        e.preventDefault()
        count += 1
        hasVoted = true
    }


    if (!hasVoted) {
        return (
            <div className='voteButtonContainer'>
                <button id='voteButton' onClick={handleVote} >Vote For</button>
            </div>
        )
    } else {
        return null
    }
}

export default VoteButton