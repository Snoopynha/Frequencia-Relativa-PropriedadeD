import java.util.Random;
import spark.Spark;

public class LancamentoMoedas {
    public static void main(String[] args) {
    	Spark.staticFileLocation("/public");
    	
    	Spark.get("/lancar", (req, res) -> {
            Random random = new Random();
        });
    }
}