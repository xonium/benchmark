import babyRank1 from "../Images/baby_1_rank.png";
import babyRank2 from "../Images/baby_2_rank.png";
import flowerRank1 from "../Images/flower_1_rank.png";
import flowerRank2 from "../Images/flower_2_rank.png";
import flowerRank3 from "../Images/flower_3_rank.png";
import castroRank1 from "../Images/castro_1_rank.png";
import castroRank2 from "../Images/castro_2_rank.png";
import castroRank3 from "../Images/castro_3_rank.png";
import bridgesRank1 from "../Images/bridges_1_rank.png";
import bridgesRank2 from "../Images/bridges_2_rank.png";
import bridgesRank3 from "../Images/bridges_3_rank.png";
import davidsdottirRank1 from "../Images/davidsdottir_1_rank.png";
import davidsdottirRank2 from "../Images/davidsdottir_2_rank.png";
import davidsdottirRank3 from "../Images/davidsdottir_3_rank.png";
import fikowskiRank1 from "../Images/fikowski_1_rank.png";
import fikowskiRank2 from "../Images/fikowski_2_rank.png";
import fikowskiRank3 from "../Images/fikowski_3_rank.png";
import toomeyRank1 from "../Images/toomey_1_rank.png";
import toomeyRank2 from "../Images/toomey_2_rank.png";
import toomeyRank3 from "../Images/toomey_3_rank.png";
import hogbergRank1 from "../Images/hogberg_1_rank.png";

export interface IRankImageProps {
    reps: number;
    totalReps: number;
  }

  const selectRankImage = (reps: number, totalReps: number) => {
    let rankPercentage = (reps / totalReps) * 100;
    
    if (rankPercentage < 5) {
      return babyRank1;
    }
    else if (rankPercentage >= 5 && rankPercentage < 10) {
        return babyRank2;
    }
    else if (rankPercentage >= 10 && rankPercentage < 15) {
        return flowerRank1;
    }
    else if (rankPercentage >= 15 && rankPercentage < 20) {
      return flowerRank2;
    }
    else if (rankPercentage >= 20 && rankPercentage < 25) {
      return flowerRank3;
    }
    else if (rankPercentage >= 25 && rankPercentage < 30) {
      return castroRank1;
    }
    else if (rankPercentage >= 30 && rankPercentage < 35) {
      return castroRank2;
    }
    else if (rankPercentage >= 35 && rankPercentage < 40) {
      return castroRank3;
    }
    else if (rankPercentage >= 40 && rankPercentage < 45) {
      return bridgesRank1;
    }
    else if (rankPercentage >= 45 && rankPercentage < 50) {
      return bridgesRank2;
    }
    else if (rankPercentage >= 50 && rankPercentage < 55) {
      return bridgesRank3;
    }                  
    else if (rankPercentage >= 55 && rankPercentage < 60) {
      return davidsdottirRank1;
    }
    else if (rankPercentage >= 60 && rankPercentage < 65) {
      return davidsdottirRank2;
    }
    else if (rankPercentage >= 65 && rankPercentage < 70) {
      return davidsdottirRank3;
    }        
    else if (rankPercentage >= 70 && rankPercentage < 75) {
      return fikowskiRank1;
    }
    else if (rankPercentage >= 75 && rankPercentage < 80) {
      return fikowskiRank2;
    }
    else if (rankPercentage >= 80 && rankPercentage < 85) {
      return fikowskiRank3;
    }
    else if (rankPercentage >= 85 && rankPercentage < 90) {
      return toomeyRank1;
    }
    else if (rankPercentage >= 90 && rankPercentage < 95) {
      return toomeyRank2;
    }
    else if (rankPercentage >= 95 && rankPercentage < 100) {
      return toomeyRank3;
    }
    else if (rankPercentage === 100) {
      return hogbergRank1;
    }
  }  

export const RankImage = (props: IRankImageProps) => {
    return <img src={selectRankImage(props.reps, props.totalReps)} alt="ranks" style={{objectFit: "cover", maxHeight: "160px"}}/>;
}