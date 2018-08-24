import java.util.Scanner;
public class Age {
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		System.out.println("Welcome to the age-ness tester...");
		int Age;
		String remark;
		boolean valid = false;
		while (valid == false){
			System.out.print("Enter your age ==> ");
			Age = Integer.parseInt(input.nextLine());
			switch(Age){
				case 1: remark = "Looks like you were born yesterday...";
				valid = true;
				break;
				case 16: remark = "You are as old as I am.";
				valid = true;
				break;
				case 8: remark = "You are half as old as I am.";
				valid = true;
				break;
				case 32: remark = "You are twice as old as me.";
				valid = true;
				break;
				case 50: remark = "I guess you are considered \"old\"";
				valid = true;
				break;
				case 100: remark = "I have a feeling you might be lying.";
				valid = true;
				break;
				default: remark = "Your life is boring...";
			}
			System.out.println(remark);
		}
		System.out.println("Well, looks like you found a valid age.");
	}
}