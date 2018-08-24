//access iterators and scanner
import java.util.Iterator;
import java.util.Scanner;
// create the class
public class HunderedScanner {
	public static void main (String[] args) {
		//define a scanner
		Scanner input = new Scanner(System.in);
		//get start
		System.out.print("Enter the start integer--->");
		int min = Integer.parseInt(input.nextLine());
		//get end
		System.out.print("Enter the end integer--->");
		int end = Integer.parseInt(input.nextLine());
		//iterator
		new Iterator<Integer>(){
			private int i = min-1;
			
			@Override
			
			public Integer next(){
				return ++i;
			}
			
			@Override
			public boolean hasNext(){
				return i < end;
			}
		}.forEachRemaining(System.out::println);
	}
}