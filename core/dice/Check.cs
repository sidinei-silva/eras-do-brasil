
namespace Eras.Core.Dice
{
    public static class Check
    {
        /*
            O grau de sucesso é determinado pela diferença entre o resultado total (natural + modificador) e a dificuldade alvo (targetDc).
            - Se a diferença for menor ou igual que -10, é uma falha crítica.
            - Se a diferença estiver entre -9 e -1, é uma falha.
            - Se a diferença estiver entre 0 e 9, é um sucesso.
            - Se a diferença for 10 ou mais, é um sucesso crítico.

            Caso o natural seja 1, o grau é decrescido em um nível (por exemplo, de sucesso para falha).
            Caso o natural seja 20, o grau é incrementado em um nível (por exemplo, de sucesso para sucesso crítico).

            O grau nunca pode ser menor que falha crítica ou maior que sucesso crítico.
            
        */
        public static Degree DegreeOf(int natural, int modifier, int targetDc)
        {
            int total = natural + modifier;
            int difference = total - targetDc;

            int degreeValue = difference switch
            {
                <= -10 => (int)Degree.CritFailure,
                >= 10 => (int)Degree.CritSuccess,
                >= 0 => (int)Degree.Success,
                _ => (int)Degree.Failure
            };

            // Ajusta o grau com base no natural
            if (natural == 1 && degreeValue > (int)Degree.CritFailure)
            {
                degreeValue--;
            }
            else if (natural == 20 && degreeValue < (int)Degree.CritSuccess)
            {
                degreeValue++;
            }

            return (Degree)degreeValue;
        }    

    }
}
