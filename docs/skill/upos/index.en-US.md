# En-Tan-Mo Technology Interpretation Development（二）

## ——Interpretations on Unified-Proof-of-Stake (UPoS)

<img src="/images/skill/guide03_en.jpg"  >

## Under UPoS scientists from En-Tan-Mo strike a balance between performance,security anddecentralization.

Consensus algorithm is at the heart of a blockchain-based network. And it is the very feature blockchains use to distinguish themselves from each other. Combining the Proof-of-Work and Delegated-Proof-of-Stake in an innovative fashion, En-Tan-Mo scientists launch Unified-Proof-of-Stake (UPoS), a consensus mechanism that delivers high-performance, security and decentralization simultaneously. A deeper understanding of the network’s consensus algorithm empowers DApp builders to take full advantage of related features and provides good guidance for their development.

## SHD Completeness

CAP theorem states that it is impossible for distributed systems to provide consistency, availability and partition tolerance simultaneously. Similarly, there exists in blockchain-based platforms a problem called SHD Completeness which implies that a trade-off has to be made among security, high-performance and decentralization. The failure to deliver SHD completeness has already become a serious impediment to blockchain development.

## PoW: from consensus to division

Proof-of-Work (PoW) is a consensus algorithm implemented by a large number of blockchain system, notably Bitcoin. Under such algorithm, computers compete for the right to forge the next block through the solving of a computationally tractable puzzle and the process is called mining, Whoever wins will be incentivized with a newly minted coin(or token). However, mining consumes a massive amount of electricity and wears down hardware. And the chance of winning is proportional to how much hash power a computer controls, thus inevitably leading to a hash power build-up within the network.

PoW-based mining is a non-cooperative game. Incentive and transaction fee go to the winner only while other computers who too put in a large amount of resources get nothing in return. Moreover, the design of traditional PoW algorithm and block size limit have always been a drag on the scalability for Bitcoin and Ethereum. As forks multiply, 51% becomes more like a imminent crisis rather than a distant threat. All of these make people start to wonder whether PoW-based blockchains are still as decentralized as intended.

**From the above, it is fair to say that PoW is not a SHD-complete mechanism.**

##  DPoS: decentralized in appearance,centralized in essence

DPoS, otherwise known as Delegated Proof of Stake, offers a new solution to network security. It works as follows: a panel of delegates will be elected based on certain mechanism, say the holding of stakes. And an odd number of block producers will be chosen from the elected delegatesvia a vote instead of all nodes across the network.

This protocol, by holding a vote among dozens to hundreds of delegatesat at most, allows the network to reach consensus in seconds. Consequently, it boosts efficiency and is implemented by EOS (which uses a few supernodes to create blocks) and Ethereum 2.0. However it falls short of decentralization, despite improvement on network performance, as larger stake holders are given overriding power over the network. It follows that DPoS systems are not essentially different from existing centralized ones.

## UPoS: a hybrid PoW and DPoS model that breaks monopoly, ends decentralization and achieves SHD completeness

There is a long-standing pattern in human history that a new technological revolution will invariably bring about unfair advantage and hence disrupt the level playing field, as witnessed in areas as varied as agriculture, industrial sector and the internet. Blockchain is no exception. It is known that fairness brought by PoW has been severely undercut by the invention of super-efficient mining machines. DPoS only seems to expedite the process. Because under the consensus, in which a few larger stake holders are chargedwith enormous power, centralization or pyramid structure will come into existence at accelerating rate.

DPoS is more environmentally-friendly and efficient, compared with the resource-intensive PoW algorithm. It adds a new block within 10 seconds, as opposed to PoW’s ten minutes. While PoW is often criticized for being too wasteful, it excels in security, for the reason that so far there hasn’t been once 51% attack. According to our design, En-Tan-Mo only needs less than 3 seconds to find the next block. This means a transaction is confirmed much more swiftly.

Through weighing the two traditional consensus algorithms’ advantages against their disadvantages, we devise a protocol called Unified-Proof-of-Stake as a way to achieve SHD completeness. To put it simply, it works as follows: first, we map the stakes of voters into votes via a concave function. Second, in each “round” we select the best 101 miners to be block producers. Third, block producers participate in a mining game (which is more economically practical and decentralized than that of Bitcoin). Last but not least, the next producer is securely chosen via chaotic shuffling.

UPoS 算法具体流程如下图所示：

![UPoS 流程](/images/skill/upos_en.png)

### Miners

Miners refer to a specific type of account that records history of transactions. They play a key role in En-Tan-Mo ecosystem through the initiation and verification of transactions. Though everyone can become miners, only 101 of whom will be elected as block producers.

### Round

We call every 101 blocks a “round”. In each round, there are 101 block producers, each has 3 seconds to find the next block and their sequence is determined by the chaotic reshuffling mechanism. If a block producer fails to generate a new block in the allotted time period, or creates a block that contains false transaction information, then the system would automatically enable the chaotic shuffling to find the next producer. Plus, every newly minted block requires the signatures of at least 68 miners and is broadcasted across the network.

### Block Reward

In En-Tan-Mo, block producers are chosen from miners. If a block producer generate a valid block, then he will be rewarded for his work in the form of token.

Block reward amounts to 240 million tokens, accounting for 48% of En-Tan-Mo’s total supply. These tokens will be distributed in six years with the each year’s share declining steadily.

> The shares of token distributed in the first six years are 12.13%, 10.11%, 8.09%, 8.09%, 6.07%, 3.51% respectively

The timetable of block reward is shown in table 1.

| Reward  | Stage                          |
| ----- | :------------------------------- |
| 6 ETM | Preliminary Stage,before 10,112,000 blocks|
| 5 ETM | Stage 1，before 20,224,000 blocks  |
| 4 ETM | Stage 1，before 30,336,000 blocks  |
| 4 ETM | Stage 1，before 40,448,000 blocks  |
| 3 ETM | Stage 1，before 50,560,000 blocks  |
| 2 ETM | Stage 1，before 59,328,000 blocks  |

### Transaction Fees for Each Round

Apart from block reward , En -Tan - Mo incentivizes participants with transaction fees. The active participants of each round will be given a proportional share of transaction fees. (see more details in reward and bonus system).

