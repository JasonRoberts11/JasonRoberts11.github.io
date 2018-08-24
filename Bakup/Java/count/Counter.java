import java.awt.*;  
import java.awt.event.*;  
public class Counter extends WindowAdapter{  
    Frame f;  
    Counter(){  
        f=new Frame();  
        f.addWindowListener(this);  
        f.setSize(600,600);  
        f.setLayout(null);  
        f.setVisible(true);
		//lables
		Label l1,l2,l3;
		TextField t1,t2,t3;
		t1= new TextField("5");
		t1.setBounds(50,75,100,30);
		t1.setEditable(true);
		t2= new TextField("10");
		t2.setBounds(50,125,100,30);
		t3= new TextField("10");
		t3.setBounds(50,175,100,30);
		l1=new Label("Count from:"); 
		l1.setBounds(50,50,100,30);
		l2=new Label("to"); 
		l2.setBounds(50,100,100,30);
		l3=new Label("by"); 
		l3.setBounds(50,150,100,30);
		//field
		TextArea area= new TextArea("Numbers \r\nasdf");
		area.setBounds(200,50,150,500);
		//button
		Button sb = new Button("Start");
		sb.setBounds(50,200,100,30);
		sb.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				area.setText("Calculating string");
				String texts = "";
				String start = t1.getText();
				String endd = t2.getText();
				String bouy= t3.getText();
				double strt = Double.parseDouble(start);
				double end = Double.parseDouble(endd);
				double bouyy = Double.parseDouble(bouy);
				double tmp = 0.0;
				for(double i = strt; i <= end; i = i + bouyy){
					tmp = Math.round(i*1000);
					tmp = tmp/1000;
					texts = texts + tmp + "\r\n";
				}
				area.setText(texts);
			}
		});
		f.add(l1);
		f.add(l2);
		f.add(t1);
		f.add(t2);
		f.add(sb);
		f.add(area);
		f.add(t3);
		f.add(l3);
    }  
public void windowClosing(WindowEvent e) {  
    f.dispose();  
}  
public static void main(String[] args) {  
    new Counter();  
	
}  
} 