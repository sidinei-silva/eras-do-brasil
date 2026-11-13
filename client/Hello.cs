using Eras.Client;
using Godot;

public partial class Hello : Node
{
	private Dice _dice = new Dice(12345);
	// Called when the node enters the scene tree for the first time.
	public override void _Ready()
	{
		int sides = 20;
		var button = GetNode<Button>("Button");
		button.Text = "Click me";

		button.Pressed += () => _OnButtonPressed(sides);

	}

	// Called every frame. 'delta' is the elapsed time since the previous frame.
	public override void _Process(double delta)
	{
	}


	private void _OnButtonPressed(int sides)
	{
		int value = _dice.Roll(sides);
		var label = GetNode<Label>("Label");
		label.Text = $"{value}";

		GD.Print($"Rolled a {sides}-sided die: {value}");
	}
}
