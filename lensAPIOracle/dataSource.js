function transform(arg) {
  let input = JSON.parse(arg);
  let stats = input.data.profile.stats;
  let follower = stats.totalFollowers;
  let following = stats.totalFollowing;
  let publications = stats.totalPublications;
  let collects = stats.totalCollects;
  let followingRatio = follower / (following + 1);
  let collectRatio = collects / (publications + 0.0001);
  if (followingRatio >= 6) {
    if (collectRatio > 0.1) return 1;
    if (collectRatio > 0.01) return 2;
    return 3;
  } else if (followingRatio >= 0.9) {
    if (collectRatio > 0.1) return 4;
    if (collectRatio > 0.01) return 5;
    return 6;
  } else {
    if (collectRatio > 0.1) return 7;
    if (collectRatio > 0.01) return 8;
    return 9;
  }
}
transform(scriptArgs[0]);
