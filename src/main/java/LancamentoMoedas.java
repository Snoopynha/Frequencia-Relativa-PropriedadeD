import java.util.Random;
import spark.Spark;
import com.google.gson.Gson;

public class LancamentoMoedas {
	public static void main(String[] args) {
		Spark.port(4567);
		Spark.staticFileLocation("public");

		Spark.get("/lancar", (req, res) -> {
			int qtdLancamentos = Integer.parseInt(req.queryParams("qtdLancamentos"));
			int intervaloLancamentos = Integer.parseInt(req.queryParams("intervaloLancamentos"));

			// Calcula o tamanho exato necessário (arredondando para cima)
			int tamanhoArray = (int) Math.ceil((double) qtdLancamentos / intervaloLancamentos);

			int totalCaras = 0;
			int totalCoroas = 0;
			Random random = new Random();

			// Arrays para armazenar as frequências que serão enviadas
			double[] freqCaras = new double[tamanhoArray];
			double[] freqCoroas = new double[tamanhoArray];
			String[] labels = new String[tamanhoArray];

			int index = 0;
			for (int i = 0; i < qtdLancamentos; i++) {
				if (random.nextBoolean()) {
					totalCaras++;
				} else {
					totalCoroas++;
				}

				// Só armazena no array se for um ponto de intervalo
				if (i % intervaloLancamentos == 0 && index < tamanhoArray) {
					freqCaras[index] = (double) totalCaras / (i + 1);
					freqCoroas[index] = (double) totalCoroas / (i + 1);
					labels[index] = String.valueOf(i + 1);
					index++;
				}
			}

			java.util.Map<String, Object> resultado = new java.util.HashMap<>();
			resultado.put("labels", labels);
			resultado.put("caras", freqCaras);
			resultado.put("coroas", freqCoroas);

			res.type("application/json");
			return new Gson().toJson(resultado);
		});
	}

	static class Data {
		String[] labels;
		double[] caras;
		double[] coroas;

		Data(String[] labels, double[] caras, double[] coroas) {
			this.labels = labels;
			this.caras = caras;
			this.coroas = coroas;
		}
	}
}