using Eras.Core.Dice;

namespace Eras.Core.Tests.Dice;

public class SplitMix64Tests
{

    [Fact]
    public void Next_SementeFixa_BateComReferencia()
    {
        // Arrange
        ulong seed = 1234567;
        ulong counter = 0;

        // Act
        ulong result = SplitMix64.Next(seed, counter);

        // Assert
        Assert.Equal(6457827717110365317UL, result);
    }

}
