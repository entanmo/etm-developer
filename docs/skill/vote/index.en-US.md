# En-Tan-Mo Technology Interpretation Development（三）

## ——From the Mass, For the Mass: interpretations of En-Tan-Mo voting, election and bonus system

<img src="/images/skill/guide02_en.jpg" >

Invented in 2008, Bitcoin has witnessed a sea change in the world over the course of a little more than a decade.

Never has a technology attracted so much attention like blockchain. Born with a close affinity with finance, it has been, unfortunately, exploited most for profit rather than for progress. The emergence of a large number of short-sighted blockchain projects represents a shift away from the technology focus. They derail the industry, and marginalize ordinary users. Mainstream currencies such as Ethereum and EOS become a game for thefew where the powerful acquire an unfair leverage and the ordinary are excluded from sharing the benefits. This not only leads to an unhealthy ecosystem, but also puts network security at risk.

Upholding the same visions as Satoshi Nakamoto's, En-Tan-Mo scientists believe that the build-up of hash power will not make blockchain network safer. It is the level of decentralization, i.e. hash power probability distribution, that plays a decisive role in the security of Bitcoin and other cryptocurrencies. This is evidenced by the fact that Bitcoin’s security deteriorates with capital influx and the rise of mining monopolies.

## The Strength of En-Tan-Mo Blockchain

In the view of En-Tan-Mo sc ien tists, decentralization is not only a technical framework but more importantly, a new mechanism, a change in mindset and the common thread running throughout En-Tan-Mo’s philosophical thoughts. In En-Tan-Mo, decentralization is brought to life by distributed system (framework), the peoplecentered voting, election and bonus system (politics) and the Unified-Proof-of-Stake consensus protocol (underlying logics).

Compared with traditional system, distributed system has three major strengths:

1. Fault Tolerance: In distributed systems, a partial glitch does not lead to a systematic breakdown, because the system is dependent upon many decentral ized , i ndependent components, all of which have a role to play in keeping it running. Therefore, such systems are more robust than others.

2. Robustness against Attack: It is prohibitively expensive to manipulate or attack distributed systems, because they don’t have a central authority. Besides, due to their decentralized nature, distributed hardware and ecosystem are hard to be monitored and attacked simultaneously.

3. Resistance against Collusion: Collusion is somewhat hard to define. Traditionally, oligarchies collude to prey on the ordinary people. To end this practice, anti-trust law is adopted throughout the world. For distributed systems, the possibility of such collusion between malicious actors is significantly lowered. With a view to better address this problem, En-Tan-Mo implements the idea of Nash equilibrium to foster a more equitable ecosystem.

## A People-centered Voting, Election and Bonus System

Blockchain is a new generation of technology borne out of the traditional infrasturacture. Yet a clear furrow needs to be ploughed between the old and the new if we are to pursue truly revolutionary progress. Clearly, a blockchain system that fails to deliver decentralization is inadequate and nothing more than a centralized system in disguise.

Alarmed by the harms of centralization, EnTan-Mo realizes it is time to put in place a new infrastructure that redresses them. One of the key component of the effort is the people-centered voting, election and bonus system.

### En-Tan-Mo Voting System

By implementing mathematical and philosophical theories into mechanism design, scientists from En-Tan-Mo devise a voting system in a bid to change traditional structure and to steer cryptocurrency back on track.

Users obtain voting right after the lock-up of a certain portion of ETM. Note that token balance doesn’t equal voting stake (the number of votes). The coversion from balance to stake is governed by the function X u = t T· (where T is the balance locked up. t is time gain coefficient and u is the coefficient of stake constraints). To eliminate monopolies and guarantee network stability and security, En-Tan-Mo makes the following changes:

1. Time Gain Coefficient----increasing opportunities for private investors

<img src="/images/skill/vote_step01_en.png" style="width:500px" >


More too often private investors get an unfair share of market profits. That’s why En-Tan-Mo introduces the concept of time gain coefficient in a bid to deliver equality for small stake holders. Under such mechanism, stakes (votes) increase over time so that even users with small holdings are rewarded with considerable payoffs. Every 24 hours the time gain coefficient increases automatically. Therefore for small holders the probability of getting a bonus also improves over time and is halved when the block producer whom they vote for successfully adds a block to the chain.

2.  Stake Constraints----lowering the weight of oligarchs

Oligarchs amass massive wealth, monopolize resources and create imbalances. All of these have severely dampened the enthusiasm of the ordinary users to participate and contribute. To prevent large stake holders from acquiring too much weight of the system, En-Tan-Mo maps balance to stake through a concave function rather than a linear function. This concave function is u, a coefficient used to restrict the stake of big holders. Through this design, large holders are unable to get superlinear reward, our ecosystem becomes more equitable and decentralization is further enhanced.

<img src="/images/skill/vote_step02_en.png" style="width:500px" >


3. Uncertainty (probability)---making the impossible possible

<img src="/images/skill/vote_step03_en.png" style="width:500px" >


The lack of mobility is the culprit of an anemia community. Hence En-Tan-Mo’s makes sure that block producers are selected on a dynamic basis. To be more specific, block producers are chosen via a probabilistic draw among miners based on their share of votes, rather than from the top 101 high-performers. This otherwise can be written as P X  / Xn . The result is that miners who rank below the 101th place may make it to producers also. Through this mechanism design, En-Tan-Mo introduces uncertainty into the election outcome so that miners who used to stand no chance now have a possibility of being elected.

As such hash power is in general evenly distributed among users and monopoly is kept in check. As long as the ordinary majority controls 50% of stakes(votes), they would have 50% say in the system. Thus, decentralization is secured and security is boosted.

#### Lock-up

Unlike bond market, En-Tan-Mo only use “lock up” in a literal sense. For every system, it is essential to have liquidity. However, a degree of stationarity is also needed in case of unexpected shocks. Thus En-Tan-Mo requires users to lock up a certain amount of ETM tokens in exchange for stakes (votes) and they can use these votes to decide who will be the block producer. The lock-up is the prerequisite of becoming a voter. The sum being locked is still kept in users’ personal accounts but it can’t be used for transactions. Through the lockup mechanism, En-Tan-Mo protects the rights and interests of small holders and sets the system on a sustainable course.

#### Voters

Voters refer to every En-Tan-Mo participants. They are closely associated with miners and have a say in the election of miners.

#### Voting

The voting page will list out each miner’s votes and performance record. Voters can choose whoever they want to become block producers.

#### Vote/Stake

Vote/Stake is the only measure of thequalification of block producer. It is obtained via a concave function based on the amount of token locked up.

#### Election Rules

In each round, a probabilistic selection will bemade among miners based on their share of stake (votes). En-Tan-Mo voting stake (vote) calculation is shown in flow chart 2.

![Vote 流程](/images/skill/rule_en.png)

▲ETM 投票权益（票数）计算流程示意图

### En-Tan-Mo Optimal Election System

If we see revolutionary voting system as a boost to security and decentralization, then optimal election system is the guarantee of stability and efficiency.

The voting mechanism of traditional DPoSbased systems are usually regarded as fair, democratic and effective. Yet En-Tan-Mo believes that only relative freedom can ensure the healthy development of the ecosystem. As such, we introduce an optimal election system with a view to phase out non-performing miners. Based on past performance, each miner will be assigned an optimal coefficient v m = / n , where m is the number of blocks a miner has successfully produced and n is the number of times he gets selected. For a miner, the probability of being elected is represented by P = R/∑Rn。

1. m≠0,n≠0 v=m/n
2. m=0,n=0 v=the average value of previous round
3. m=0,n≠0 v=1/10*n^2

### En-Tan-Mo Bonus System

In En-Tan-Mo system, miners and voters are closely related. When a block producer mines a new block, his voters can obtain bonus. Such bonus totals 25 million ETM tokens, taking up 5% of the total supply. It will be distributed over the course of 6 years and the amount given decreases steadily year-by-year

> The share is 2.0224%, 1.0112%, 0.5056%, 0.5056%, 0.5056%, 0.4496% respectively.

The timetable of block voting bonus is shown in table 2:

| Reward     | Stage                            |
| -------- | :-------------------------------- |
| 1 ETM    | Preliminary Stage,before 10,112,000 blocks |
| 0.5 ETM  | Stage 1，before 20,224,000 blocks   |
| 0.25 ETM | Stage 1，before 30,336,000 blocks   |
| 0.25 ETM | Stage 1，before 40,448,000 blocks   |
| 0.25 ETM | Stage 1，before 50,560,000 blocks   |
| 0.26 ETM | Stage 1，before 59,328,000 blocks   |

the total amount of rewards:

- 1/2 will be first evenly divided into 101 shares and then given to the voters of elected block producers. The bonus a voter receives is proportional to the votes he/she casts.
- 1/2 will be given to the voters of a random elected block producers after the round is over. The bonus a voter receives is proportional to the
votes he/she casts.

## From the People, For the People

As a traditional Chinese saying goes, “never forget why you started and your mission can be accomplished.” When it comes to En-Tan-Mo, its founding vision is to create true value and remove the impediment of blockchain’s development; to embrace extensive participation instead of being the game restricted to the elite; to become a truly decentralized autonomous community, makes the unobstructed value transfer a reality and putan end to monopoly once and for all. As such, En-Tan-Mo’s entire infrastructure, be it voting system or bonus system, are designed to realize these goals and be true to its promise----from the people, for the people
