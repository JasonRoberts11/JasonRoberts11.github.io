/* Exam Scores
 * 
 * 3 exams with 150 points possible for each exam. 
 * Your final grade in the course was the sum of the number of questions
 * you got right on each of exam1, exam2 and exam3 divided by 450 (the 
 * maximum possible points) 
 * 
 * Write a program which displays the 3 exam scores, Total Points and the 
 * Total Average Percent of all 3 exam scores (as a whole number) 
 * 
 * SAMPLE RUN: 
 *  Exam 1 Score : 120
 *  Exam 2 Score : 135
 *  Exam 3 Score : 130
 *  Total points : 385
 *  Percentage : 85
 *  
 */

import java.util.Scanner;

public class examScores {

    public static void main(String[] args) {
        int exam1, exam2, exam3, total, pct;
        Scanner input = new Scanner(System.in);
        System.out.print("Exam 1 Score : ");
        exam1 = input.nextInt();  
		System.out.print("Exam 2 Score : ");
        exam2 = input.nextInt();
		System.out.print("Exam 3 Score : ");
        exam3 = input.nextInt();
        
        total = exam1 + exam2 + exam3;
        Double percent = ((total)/4.50);
		pct = percent.intValue();
        System.out.printf("Total points : %d\n", total);
		System.out.printf("Percentage : %d",pct);
        
    }
}
