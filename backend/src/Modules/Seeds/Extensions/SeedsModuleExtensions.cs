using Microsoft.Extensions.DependencyInjection;
using Plantarium.Modules.Seeds.Application.Interfaces;
using Plantarium.Modules.Seeds.Application.Services;
using Plantarium.Modules.Seeds.Domain.Interfaces;
using Plantarium.Modules.Seeds.Infrastructure.Persistence.Repositories;

namespace Plantarium.Modules.Seeds.Extensions;

public static class SeedsModuleExtensions
{
    public static IServiceCollection AddSeedsModule(this IServiceCollection services)
    {
        services.AddScoped<ISeedRepository, SeedsRepository>();
        services.AddScoped<ISeedService, SeedService>();

        return services;
    }
}
