using Eras.Core.Dice;

namespace Eras.Core.Tests.Dice;

public class CheckTests
{
    [Theory]
    // as 4 faixas, com dado comum
    [InlineData(10, 0, 1, Degree.Success)] // acima da CD é sucesso
    [InlineData(10, 0, 11, Degree.Failure)] // abaixo da CD é falha
    [InlineData(11, 0, 1, Degree.CritSuccess)] // "CD+10 ou mais é sucesso crítico"
    [InlineData(2, 0, 12, Degree.CritFailure)] // "CD-10 ou menos é falha crítica"
    // fronteiras exatas
    [InlineData(10, 0, 10, Degree.Success)] // igual a CD é sucesso
    [InlineData(9, 0, 10, Degree.Failure)] // "um abaixo da CD é falha"
    [InlineData(19, 0, 9, Degree.CritSuccess)] // "CD+10 ou mais é sucesso crítico"
    [InlineData(10, -10, 10, Degree.CritFailure)] // "CD-10 ou menos é falha crítica"
    // modificadores
    [InlineData(10, 5, 15, Degree.Success)] // "10+5=15, igual a CD, é sucesso"
    [InlineData(11, -5, 15, Degree.Failure)] // "11-5=15, abaixo da CD, é falha"
    [InlineData(10, 10, 10, Degree.CritSuccess)] // "10+10=20, acima da CD+10, é sucesso crítico"
    [InlineData(10, -10, 15, Degree.CritFailure)] // "10-10=0, abaixo da CD-10, é falha crítica"
    // casos de natural 1 e 20
    [InlineData(1, 0, 0, Degree.Failure)] // "natural 1, mesmo que o total seja sucesso, é falha"
    [InlineData(20, 0, 21, Degree.Success)] // "natural 20, mesmo que o total seja falha, é sucesso"
    // nat 20 / nat 1 mudam exatamente um grau (pegam o bug do ±10)
    [InlineData(20, -20, 10, Degree.Failure)] // total 0, dif −10: falha crítica sobe para falha
    [InlineData(20, -30, 10, Degree.Failure)] // total −10, dif −20: falha crítica sobe para falha
    [InlineData(1, 9, 10, Degree.Failure)] // total 10, dif 0: sucesso desce para falha
    [InlineData(1, 29, 10, Degree.Success)] // total 30, dif 20: crítico desce para sucesso
    // teto e piso
    [InlineData(20, 0, 5, Degree.CritSuccess)] // dif 15: crítico com nat 20 continua crítico
    [InlineData(1, 0, 15, Degree.CritFailure)] // dif −14: falha crítica com nat 1 continua falha crítica
    public void DegreeOf_Casos_RetornaGrauEsperado(int natural, int modifier, int targetDc, Degree expectedDegree)
    {
        // Act
        var result = Check.DegreeOf(natural, modifier, targetDc);

        // Assert
        Assert.Equal(expectedDegree, result);
    }

}
