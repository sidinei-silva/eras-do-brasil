using Eras.Core.Dice;

namespace Eras.Core.Tests.Dice;

public class RngTests
{
    [Fact]
    public void Roll_MesmoRng_RetornaMesmoValor()
    {
        // Arrange
        ulong seed = 67890;
        ulong counter = 0;
        int sides = 10;

        var rng = new Rng(seed, counter);

        // Act
        var (value1, nextRng1) = rng.Roll(sides);
        var (value2, nextRng2) = rng.Roll(sides);

        // Assert
        Assert.Equal(value1, value2);
        Assert.Equal(nextRng1, nextRng2);
    }

    [Fact]
    public void Roll_UmaRolagem_ProximoComCounterMaisUm()
    {
        // Arrange
        ulong seed = 54321;
        ulong counter = 0;
        int sides = 8;

        var rng = new Rng(seed, counter);

        // Act
        var (_, nextRng) = rng.Roll(sides);

        // Assert
        Assert.Equal(counter + 1, nextRng.Counter);
    }

    [Fact]
    public void Roll_MilCountersSeguidos_FicaEntreUmELados()
    {
        // Arrange
        ulong seed = 98765;
        ulong counter = 0;
        int sides = 20;

        var rng = new Rng(seed, counter);

        // Act & Assert
        for (int i = 0; i < 1000; i++)
        {
            var (value, nextRng) = rng.Roll(sides);
            Assert.InRange(value, 1, sides);
            rng = nextRng; // Atualiza o Rng para a próxima rolagem
        }
    }

    [Fact]
    public void Roll_CemCountersDiferentes_NemTodosIguais()
    {
        // Arrange
        ulong seed = 12345;
        int sides = 6;

        // Act & Assert
        var rng = new Rng(seed, 0);
        HashSet<int> values = [];


        for (int i = 0; i < 100; i++)
        {
            var (value, nextRng) = rng.Roll(sides);
            values.Add(value);
            rng = nextRng; // Atualiza o Rng para a próxima rolagem
        }

        Assert.True(values.Count > 1, "Todos os valores foram iguais, o que não era esperado.");
    }

    [Fact]
    public void Roll_CemSementesDiferentes_NemTodasIguais()
    {
        // Arrange
        int sides = 6;

        // Act & Assert
        HashSet<int> values = [];

        for (ulong seed = 0; seed < 100; seed++)
        {
            var rng = new Rng(seed, 0);
            var (value, _) = rng.Roll(sides);
            values.Add(value);
        }

        Assert.True(values.Count > 1, "Todos os valores foram iguais, o que não era esperado.");
    }
}
