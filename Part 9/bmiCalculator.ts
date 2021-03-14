const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) return 'Underweight'
  if (bmi >= 18.5 && bmi < 25) return 'Normal weight'
  if (bmi >= 25 && bmi <30) return 'Overweight'
  if (bmi >= 30) return 'Obese'
}

console.log(calculateBmi(180, 74))
