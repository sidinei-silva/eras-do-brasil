using Eras.Client;
using Godot;

public partial class DiceTest : Control
{
	// Exports e Sinais
	[Export]
	private ulong Seed = 1;

	// Components
	private Button _rollButton;
	private RollPanel _rollPanel;

	// Atributos da class
	private Dice _dice;


	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		_dice = new Dice(Seed);
		_rollButton = GetNode<Button>("%RollButton");
		_rollPanel = GetNode<RollPanel>("%RollPanel");
		_rollButton.Pressed += _OnRollButtonPressed;
		_rollPanel.FinishedRoll += () => _rollButton.Disabled = false;
	}

	private void _OnRollButtonPressed()
	{
		_rollButton.Disabled = true;
		int v = _dice.Roll(20);
		_rollPanel.ShowRoll(v);
	}
}
