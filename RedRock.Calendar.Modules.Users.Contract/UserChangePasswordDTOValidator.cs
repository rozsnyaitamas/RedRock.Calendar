using FluentValidation;

namespace RedRock.Calendar.Modules.Users.Contract
{
    public class UserChangePasswordDTOValidator : AbstractValidator<UserChangePasswordDTO>
    {
        public UserChangePasswordDTOValidator()
        {
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required");
            RuleFor(x => x.Password).MinimumLength(8).WithMessage("Password must have at least 8 characters.");
        }
    }
}
