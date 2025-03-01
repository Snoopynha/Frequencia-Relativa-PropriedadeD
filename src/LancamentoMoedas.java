import java.util.Random;
import spark.Spark;
import com.google.gson.Gson;

public class LancamentoMoedas {
    public static void main(String[] args) {
    	Spark.staticFileLocation("/public");
    	
    	Spark.get("/lancar", (req,res) -> {
    		int qtdLancamentos = Integer.parseInt(req.queryParams("qtdLancamentos"));
    		int intervaloLancamentos = Integer.parseInt(req.queryParams("intervaloLancamentos"));
    		
    		int[] caras = new int[qtdLancamentos];
    		int[] coroas = new int[qtdLancamentos];
    		int totalCaras = 0;
    		int totalCoroas = 0;
    		
    		Random random = new Random();
    		
    		for (int i=0; i<qtdLancamentos; i++) {
    			if(random.nextBoolean()) {
    				totalCaras++;
    			} else {
    				totalCoroas++;
    			}
    			caras[i] = totalCaras;
    			coroas[i] = totalCoroas;
    		}
    		
    		double[] freqCaras = new double[qtdLancamentos];
    		double[] freqCoroas = new double[qtdLancamentos];
    		String[] labels = new String[qtdLancamentos/intervaloLancamentos];
    		
    		for(int i=0; i<qtdLancamentos; i+=intervaloLancamentos) {
    			freqCaras[i/intervaloLancamentos] = (double) (caras[i]/ (i+1));
    			freqCoroas[i/intervaloLancamentos] = (double) (coroas[i]/ (i+1));
    			labels[i/intervaloLancamentos] = String.valueOf(i+1);
    		}
    		
    		res.type("application/json");
            return new Gson().toJson(new Data(labels, freqCaras, freqCoroas));
    	}); 
    }
    
    static class Data {
    	String[] labels;
    	double[] caras;
    	double[] coroas;
    	
    	Data(String[] labels, double[] caras, double[] coroas){
    		this.labels = labels;
    		this.caras = caras;
    		this.coroas = coroas;
    	}
    }
}