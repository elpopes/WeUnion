import "./Actions.css"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/session"

const Actions = (grief) => {
    const dispatch = useDispatch()
    const { fullGrief } = grief
    const actions = ['action1', 'action2']
    console.log(fullGrief)
    const currentUser = useSelector(getCurrentUser)

    let alreadyVoted = grief.poll.voters.includes(currentUser)

    

    const handleVote = (e) => {
        e.preventDefault()
        // dispatch add currentUser to e.target's voters, add to vote count, and refresh
    }

    if (alreadyVoted) {
        return (
            <ul>
            {actions.map(action => {
                return (
                    <li>
                        <div>{action}</div>
                        <div>{grief.poll.options.option.votes/grief.poll.options.totalVotes}</div>
                    </li>
                )})
            }
            </ul>
        )
    } else {
        return (
            <ul>
                {actions.map(action => {
                    return (
                        <li>
                            <div>{action}</div>
                            <button className='actionVoteButton' onClick={handleVote} value={action}>Vote For</button>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Actions