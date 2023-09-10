# LensTell
 Give the magic ball a profile id and it will tell a character according to the lens profile data. What's more cool is that the magic ball will also mint you an NFT which contains information associated to the character. No solid psychology knowlege backed, it's a story telling product so just enjoy the story and have fun🔮
 
 Wath the demo on [youtube](https://www.youtube.com/watch?v=XxM6WYwOGkQ)
 
- contract: contains the smart contract code
  the main contract is the contract/contracts/LensTell.sol
- frontend: contains the frontend code
- lensAPIOracle: the lens oracle data cource code in blueprint


*Detailed deployment or set up dev environment steps are in frontend or contract folder's own README*
  


# Introduction
Welcom to LensTell, where dark magic weaves lens data secrets into stories🔮. 

Provide a lens profile Id in the frontend. Then send the tell request to mumbai network with 0.01 matic to unlock ancient forces .

Wait quietly for a while, then you will recieve what the magic ball tell about the provided id and at the same time you would recieve an NFT which represents the words of the magic ball.

The main idea of the project is storytelling. Stories're powerful, they're universal languages, spreading everywhere and sparking imagination. NFT is a popular approach for artists to create, lens is a hot web3 social network, they're two excellent materials for storytelling. However,for web3 artists,combining the two materials can be challenging, since blockchain data(lens data here) is hard to computed *decentralizly* . I hope LensTell demonstrate how you can compute and consume data from different resources decentralizedly and automatically with Phala, and thus, with the ability to combine data more flexibly, artists have an abundance of materials to unleash their creativity.


# Characters
Based on differect data characters of the lens profile, we provide nine in total characters.

## how the nine characters generated? (Well, be careful, you're going to learn some dark magic😈 )

3 base characters are given according to the ratios of follower/following 

|ratio|base character|character traits|generated base character description|
|-|-|-|-|
|follower/(following+1)>=6|Digital Luminary|Trendsetter, Opinion Leader, Connected, Charismatic |Like a supernova lighting up the social media galaxy, the Digital Luminary's posts shine brilliantly, guiding others with their captivating content. Their massive following is a constellation of supporters drawn to their wisdom and charisma, turning their profile into a beacon of inspiration.|
|follower/(following+1)>=0.9|Community Butterfly |Collaborative, Balanced, Supportive, Engaging|Much like a conductor orchestrating a symphony, the Community Butterfly skillfully blends their connections into a harmonious melody. Their online presence resembles a garden where every interaction is a blooming flower, nurtured by empathy and respect, creating a vibrant tapestry of unity.|
|follower/(following+1)<0.9|Whispering Sage|Niche, Thought-Provoking, Humble, Authentic|Much like a hidden oasis in a vast desert, the Whispering Sage's online presence is a sanctuary of wisdom and authenticity. Their words are like gentle breezes, touching the hearts of those who venture close, leaving behind ripples of introspection and connection. Their small following is a gathering of cherished companions, united by the shared journey of seeking profound insights.|

like wise, 3 base characters are given according to the ratios of collections/(publications+0.0001)
|ratio|base character|traits|base character description|
|-|-|-|-|
|>0.1|Sculpted Insight Curator| Curatorial, Reflective, Insightful|Much like a curator of rare artifacts, the Sculpted Insight Curator releases only gems into the digital realm. Their posts are like intricately sculpted sculptures, each piece meticulously carved to reveal layers of wisdom. Collectors flock to their creations, recognizing the value of each piece and cherishing them like precious relics.|
|0.1>ratio>0.01|Equilibrium Artisan|Harmonious, Attentive, Consistent|The Equilibrium Artisan treads the delicate balance between expression and reception, crafting posts like delicate brushstrokes on a canvas. Their creations are akin to a zen garden, where every stone (post) and every raked line (collect) is purposefully placed, inviting contemplation and reverence|
|ratio<=0.01|Content Maestro| Prolific, Inventive, Engaging|Like a fountain of creativity, the Content Maestro's posts flow ceaselessly, each drop a masterpiece of innovation. Their creations are like magnetic treasures, drawing admirers who eagerly collect and support their endeavors, forming a gallery of inspiration.|

In the end, combine these base characters, we can get 3*3=9 totally new characters. Then with the help of **stable diffusion**, I turned the 9 new characters' description into illustrations. Congratulations! You've gratuated from the magic mini class, maybe Hogwarts for your next step?

For full characters reference : ipfs://QmQxfPhnrKiRCAFPzDGk6BhTz7qBMUejsBKH4cXDWEEqSc

## character example: 

### Name: Luminous Conductor

### illustration:

![luminousConductor](https://github.com/Ricy137/LensTell/assets/97211928/03596ae3-7970-498d-910b-4da13c90fbd6)

### description:
A conductor of ethereal energies, the Luminous Conductor orchestrates symphonies of wisdom and insight. Their posts are notes in a celestial score, resonating with harmony. Collectors are drawn to these luminous compositions, forming a celestial orchestra of enlightenment.

### related lens data character:
follower/(following+1)>=6 and 0.1>ratio>0.01 (much more followers than following and Balanced Publication and Collect Numbers )



# Transaction details
Consumer address : 0xFE6185Aad4277C38E9C59DBe17c2319FDf9a4FE2 (polygon mumbai) 

<img width="831" alt="Screen Shot 2023-08-27 at 17 50 59" src="https://github.com/Ricy137/LensTell/assets/97211928/7528d226-85b0-4435-8307-306e05744706">

<img width="856" alt="Screen Shot 2023-08-27 at 18 07 37" src="https://github.com/Ricy137/LensTell/assets/97211928/62d1ab62-d823-4e41-9b8e-55ddda609121">

