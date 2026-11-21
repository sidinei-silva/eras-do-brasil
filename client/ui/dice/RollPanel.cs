using Eras.Client;
using Godot;
using System;

namespace Eras.Client
{
	public partial class RollPanel : VBoxContainer
	{

		private D20 _d20;

		[Signal]
		public delegate void FinishedRollEventHandler();

		// Called when the node enters the scene tree for the first time.
		public override void _Ready()
		{
			_d20 = GetNode<D20>("Frame/Margin/Content/D20");
			_d20.FinishedRoll += () => EmitSignal(SignalName.FinishedRoll);
		}

		public void ShowRoll(int value)
		{
			_d20.ShowResult(value);
		}
	}
}