using Godot;

namespace Eras.Client
{


	public partial class D20 : Control
	{
		[Signal]
		public delegate void FinishedEventHandler();

		[Export]
		public float SpinSeconds = 1.5f;

		[Export]
		public int PreviewValue = 20;

		private Label _number;
		private AnimatedSprite2D _faceAnimatedSprite;

		private bool _spinning = false;


		public override void _Ready()
		{
			_number = GetNode<Label>("Number");
			_faceAnimatedSprite = GetNode<AnimatedSprite2D>("AnimatedSprite2D");
			_faceAnimatedSprite.Animation = "idle";
			if (GetTree().CurrentScene == this) ShowResult(PreviewValue);
		}

		public async void ShowResult(int value)
		{

			if (_spinning) return;

			// Esconde o numero do dado
			_number.Text = "";
			_number.Visible = false;

			_spinning = true;
			_faceAnimatedSprite.Play("spin");

			await ToSignal(GetTree().CreateTimer(SpinSeconds), SceneTreeTimer.SignalName.Timeout);

			_faceAnimatedSprite.Play("idle");

			_number.Text = value.ToString();
			_number.Visible = true;

			_spinning = false;
			EmitSignal(SignalName.Finished);

		}
	}
}