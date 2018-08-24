import java.awt.Color;
import java.awt.Graphics;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.*;
public class game extends JPanel {
  public game() {
  }
  public void paintComponent(Graphics g) {
    int width = getWidth();
    int height = getHeight();
    g.setColor(Color.black);
    g.drawOval(0, 0, width, height);
  }
  public static void main(String args[]) {
    JFrame frame = new JFrame("Oval Sample");
	JTextField t1;
	t1 = new JTextField("Welcome to jav");
	t1.setBounds(50,100, 200,30);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.add(new game());
    frame.setSize(300, 200);
    frame.setVisible(true);
	frame.add(t1);
  }
}