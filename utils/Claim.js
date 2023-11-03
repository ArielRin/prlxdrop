import { ClaimAddress, claimAbi } from './constants'
const claimContract = web3 => {
    return new web3.eth.Contract(claimAbi, ClaimAddress)
}

export default claimContract
