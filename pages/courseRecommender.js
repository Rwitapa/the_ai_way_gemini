/**
 * @typedef {Object} CourseInput
 * @property {number} experienceYears - Years of professional experience.
 * @property {"low"|"medium"|"high"} comfortSQL - Comfort level with SQL.
 * @property {number} timePerWeekHours - Hours per week available to study.
 * @property {"automate_one_kpi"|"build_agents"} goal - The primary career goal.
 * @property {"low"|"high"} managerBuyIn - Level of support from management.
 */

/**
 * @typedef {Object} CourseRecommendation
 * @property {"sprint"|"accelerator"} recommended - The recommended course.
 * @property {string[]} reasons - An array of strings explaining the recommendation.
 * @property {string} ctaCopy - A call-to-action string.
 * @property {string} deepLink - The URL for the recommended course.
 */

/**
 * Decides between "3-Hour Champion Sprint" and "16-Hour Superstar Accelerator".
 * @param {CourseInput} inputs - The user's input.
 * @returns {CourseRecommendation} The course recommendation.
 */
export function recommendCourse(inputs) {
  let sprintScore = 0;
  let acceleratorScore = 0;
  const reasons = [];

  // Rule 1: Experience Level
  if (inputs.experienceYears < 2) {
    sprintScore += 2;
    reasons.push("The Sprint is a great way to get a quick, impactful win early in your career.");
  } else {
    acceleratorScore += 2;
    reasons.push("With your experience, you're ready to tackle the advanced, portfolio-building projects in the Accelerator.");
  }

  // Rule 2: SQL Comfort
  if (inputs.comfortSQL === 'low') {
    sprintScore += 2;
    reasons.push("The Sprint is perfect for building foundational skills without requiring deep SQL knowledge.");
  } else {
    acceleratorScore += 2;
    reasons.push("Your comfort with SQL means you can dive right into the more complex data pipelines taught in the Accelerator.");
  }

  // Rule 3: Time Commitment
  if (inputs.timePerWeekHours < 8) {
    sprintScore += 2;
    reasons.push(`With ${inputs.timePerWeekHours} hours a week, the focused 3-hour Sprint is a manageable and high-impact choice.`);
  } else {
    acceleratorScore += 2;
    reasons.push("You have enough time to dedicate to the immersive, multi-weekend format of the Accelerator.");
  }

  // Rule 4: Primary Goal
  if (inputs.goal === 'automate_one_kpi') {
    sprintScore += 3; // Heavily weighted
    reasons.push("Your goal to automate a specific KPI is the exact outcome the Champion Sprint is designed to deliver.");
  } else {
    acceleratorScore += 3; // Heavily weighted
    reasons.push("Your ambition to build AI agents aligns perfectly with the Accelerator's end-to-end, project-based curriculum.");
  }
  
  // Rule 5: Manager Buy-In (tie-breaker)
  if (inputs.managerBuyIn === 'low') {
      sprintScore += 1;
      reasons.push("The Sprint provides a fast, proven win that's easy to demonstrate for future buy-in.");
  } else {
      acceleratorScore +=1;
      reasons.push("Strong manager buy-in supports the deeper, more strategic investment of the Accelerator.");
  }

  const isAccelerator = acceleratorScore > sprintScore;

  return {
    recommended: isAccelerator ? 'accelerator' : 'sprint',
    reasons,
    ctaCopy: isAccelerator ? 'Level Up with the Accelerator' : 'Get a Quick Win with the Sprint',
    deepLink: isAccelerator ? '/enroll?a=superstar&utm=picker_accel' : '/enroll?s=champion&utm=picker_sprint',
  };
}

/**
 * Generates a 60-80 word explanation for the recommendation.
 * @param {CourseRecommendation} recommendation - The recommendation object.
 * @returns {string} A formatted explanation string.
 */
export function generateExplanation(recommendation) {
    const courseName = recommendation.recommended === 'sprint' 
        ? "3-Hour Champion Sprint" 
        : "16-Hour Superstar Accelerator";
        
    // Select the most relevant reasons to keep it concise
    const primaryReason = recommendation.reasons[3]; // Goal-based reason
    const secondaryReason = recommendation.reasons[0]; // Experience-based reason
    const tertiaryReason = recommendation.reasons[2]; // Time-based reason

    return `Based on your goals, we recommend the ${courseName}. ${primaryReason} ${secondaryReason} It's the ideal next step because it directly matches your objectives and fits your schedule, ensuring you gain the most relevant skills for your career path. This program is designed to deliver a clear return on your investment of time and effort, empowering you to make a tangible impact quickly.`;
}
