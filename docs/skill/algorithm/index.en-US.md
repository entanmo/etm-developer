# En-Tan-Mo Technology Interpretation Development（四）

## ——Source of Randomness: En-Tan-Mo chaotic shuffling and tower of time algorithm, the foundation of a brand new world
<img src="/images/skill/guide04_en.jpg"  >

Life is like a box of chocolate, you never know what you are going to get. In a world full of uncertainty, one never knows what the future has in store. Though uncertainty always comes along with anxiety and fear, it also gives birth to new hope and endless possibilities, driving individual and human progress. A world of stationarity is a world that doesn’t worth living in.

The wheel of world history is pushed forward by a collection of unexpected events. If we say the uncertainty principle of quantum physics is the end of the relation between cause and effect, then randomness holds the key to the equality in the crypto-community. In En-Tan-Mo, order is built via an algorithm instead of an omniscient god. This algorithm is called chaotic shuffling. It is embedded throughout the entire En-Tan-Mo infrastructure and features prominently in mechanisms to keep the network safe and equitable.

## Source of Randomness

Randomness is indispensable for a variety of things including encryption, the shuffling of cards, the handling of unknown parameters in weather forecast and flight dispatch. If a computers want to generate random numbers, it cannot do without real-world randomness. To be more specific, it has to measure random physical phenomenon using a particular hardware or equipment. Some random number generators obtain randomness from background radiation detected by Geiger counter over short timescales. But such method requires extra devices, takes time to collect data and produce result that can’t be reproduced.

Computers are deterministic, that is, they act under pre-programmed instructions. Therefore, computationally generated random numbers are often called pseudo-random numbers. Here “pseudo” doesn’t mean these numbers are fake. It only means they are apparently random numbers with a underlying pattern. These numbers are usually generated from random seeds. In other word, if a pseudo-random number generator is reinitiated with the same seed, it will produce the same set of random numbers. This reproducibility is harnessed by blockchain to reach consensus.

## Source of Chaos

The idea of chaos is a time-honored concept for Europe and China alike. Though it may mean differently, the philosophical implications is very much the same. In the Metamorphoses, Ovid described chaos in the famous line, “Ere land and sea and the all-covering sky were made, in the whole world the countenance of nature was the same, all one, well named Chaos, a raw and undivided mass, naught but a lifeless bulk, with warring seeds of ill-joined elements compressed together.” Similar descriptions of a shapeless mass can also be found in Chinese classic literature. However in modern science, chaos is discussed in a wholly different way.

Chao theory, in mathematical and physical sense, is first conceived by Edward Lorenz, a meteorologist from MIT. When Lorenz was running a numerical computer model of weather prediction, he entered a rounded initial value instead of the full precision value. However, the minute variation in initial data which was seemingly inconsequential later yielded grossly divergent results. This finding eventually led to his famous theory known as the “butterfly effect”. The most cited analogy for it is that the flapping of butterfly’s wings in Brazil would set off a tornado in Texas.

As a Chinese saying goes, “a miss is as good as a mile.” A small change in initial condition would result in vast discrepancy. That is the most fundamental idea of chaos theory

Ever since Lorenz discovered the dynamic system’s sensibility to initial value, similar patterns have also been found in other natural and social phenomenon. And chaos theory has been applied extensively in a variety of disciplines, including biomedicine, computer science and fluid mechanics.

## Chaotic Shuffling

Computer is deterministic, yet this very feature is often exploited by attackers. For a blockchain system, the sequence of miners has to be deterministic. However this also increases miners’ risk of being targeted and attacked should the sequence is known to malicious actors who want to temper with transactions.

In traditional blockchain systems, the sequence of miners is determined and made public as soon as they are chosen, making them susceptible to attacks. as shown in flow chart 3.

newList = F(height, list)

To add ress th is problem , En-Tan-Mo implements the chaotic shuffling algorithm which takes advantage of the dynamic system’s extreme sensitivity to initial data. As we know from chaotic theory, a minor change to the initial value would lead to grossly different outcomes. In other word, it would add a degree of uncertainty to the prediction process. Yet such uncertainty can be very helpful when it comes to enhance network security. Through chaotic shuffling algorithm, thesequence of block producers is not determined from the very beginning. The method to obtain the number of the next producer is take a fraction of data from the earlier block, map it and do iterative calculation. So the identity of the next block producer is not made known until the last minute. By then it would be too late for malicious actors to plot and initiate an attack against him. Plus, chaotic shuffling is deterministic. Every miner can get the same result with the same initial value. In this way, En-Tan-Mo realizes stability and security while preserving decentralization.

index = F(id, slot, limit (0~100))

![混沌排序](/images/skill/alg_progress_en.png)

## The Random Source of Chaotic Shuffling-Tower of Time

For every intricate system, individual behaviors may be controllable, but the collective behaviors are not. Thus we can use the blockchain characteristics to ensure the reliability and equality of random number generation by allowing every participants to be the provider of random seeds.

With this in mind, we devise the Nash equilibrium-based tower of time algorithm. Under this algorithm, anyone who makes a deliberate change to a single parameter will get the result in his favor. Hence the algorithm can serve as a genuinely distributed and reliable source of randomness.

### Tower of Time Algorithm

**Algorithm input:**N hash value, M iterations, X SHA computation

**Description of Parameters:**

1.1. N, M and X are algorithm parameters. By changing N, M and X, we can adjust the time complexity.

2. X is a constant that denotes the times of SHA256 computation.

**Procedures: **

1. Denotes the hash value of the first block of N blocks by H0.

2.  Iterating H0' = SHA256(H0) X times, we get Q0

   ```c++
   for(i=0; i<X; i++){
   	H0 = SHA256(H0);
   }
   Q0 = H0;
   ```

3.  SubstituteQ0 into chaotic shuffling algorithm and get the index of the next block. K1 = Chaos(Q0,H, N).

4.  Find the hash value of K1 block and denote it by H1.

5. H~1~ = H~0~ + H~1~

6. Do SHA256 computation on H1. Repeat step 2 to 5 and then obtain Q1 and iterate it M times.

7. Sum Q1 to QM and output the final result.

 **Characteristics：**

1. We use the characteristics of iterative algorithm as a way to mitigate the influence of parallel computing.

2. By using the characteristics of chaos algorithm and through iteration and random selection, we prevent subsequent block producers from gaining more information over time.

3. The time complexity can be adjusted via changes to the parameters so that the algorithm can meet the need of random number of varied frequency.

## Order and Equality

Chaotic shuffling is the most important implementation of chaos theory in En-Tan-Mo blockchain. It spreads random seed across the network so as to maintain equality and establish order within the network. Plus, it will be provided to all DApp developers as a way to eradicate cheat and make the application ecosystem fairer.

Without a reliable source of randomness, DApp users are not in control of their own fates as developers and operators still hold sway over the DApp’s assets (the production rate of in-game items) and equality (the wining rate). En-Tan-Mo’s tower of time algorithm, derived from chaos theory, uses the very “chaos” to build a reliable source of randomness so as to establish order and equality in the network.

