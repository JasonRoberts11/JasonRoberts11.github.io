package game;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JLabel;
public class TButon extends JButton{
	public TButon(int id,JLabel Jlab){
		ActionListener al = new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			Jlab.setText(""+id);
			}
		};
		this.addActionListener(al);
	}
}
