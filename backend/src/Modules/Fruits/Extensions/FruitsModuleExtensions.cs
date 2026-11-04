

using Microsoft.Extensions.DependencyInjection;
using Plantarium.Modules.Fruits.Application.Interfaces;
using Plantarium.Modules.Fruits.Domain.Interfaces;
using Plantarium.Modules.Fruits.Infrastructure.Persistence.Repositories;

namespace Plantarium.Modules.Fruits.Extensions;
public static class FruitModuleExtensions
{
    public static IServiceCollection AddFruitsModule(this IServiceCollection services)
    {
        services.AddScoped<IFruitService, FruitService>();
        services.AddScoped<IFruitRepository, FruitRepository>();

        return services;
    }
}